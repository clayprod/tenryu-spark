import puppeteer from 'puppeteer';
import { writeFileSync, mkdirSync, existsSync, readFileSync, statSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = process.env.BASE_URL || 'http://localhost:4173';
const DIST_DIR = join(__dirname, '..', 'dist');
const PORT = 4173;

// Rotas estáticas do site
const staticRoutes = [
  '',
  '/creditos',
];

// Função para iniciar servidor local usando vite preview
function startLocalServer() {
  return new Promise((resolve, reject) => {
    try {
      // Verificar se o diretório dist existe
      if (!existsSync(DIST_DIR)) {
        console.error('❌ Diretório dist não encontrado. Execute "vite build" primeiro.');
        process.exit(1);
      }

      console.log('🚀 Iniciando servidor preview...');
      
      // Iniciar vite preview
      const previewProcess = spawn('npx', ['vite', 'preview', '--port', PORT.toString(), '--host'], {
        stdio: 'pipe',
        shell: true,
      });

      let serverReady = false;

      previewProcess.stdout.on('data', (data) => {
        const output = data.toString();
        if (output.includes('Local:') || output.includes('localhost')) {
          if (!serverReady) {
            serverReady = true;
            console.log(`✅ Servidor preview iniciado em ${BASE_URL}`);
            // Aguardar um pouco para garantir que está pronto
            setTimeout(() => resolve(previewProcess), 2000);
          }
        }
      });

      previewProcess.stderr.on('data', (data) => {
        const output = data.toString();
        // Ignorar avisos comuns
        if (!output.includes('WARN') && !output.includes('warn')) {
          console.error('Preview stderr:', output);
        }
      });

      previewProcess.on('error', (err) => {
        console.error('❌ Erro ao iniciar preview:', err);
        reject(err);
      });

      // Timeout de segurança
      setTimeout(() => {
        if (!serverReady) {
          console.log('ℹ️  Assumindo que servidor está pronto...');
          serverReady = true;
          resolve(previewProcess);
        }
      }, 5000);
    } catch (err) {
      reject(err);
    }
  });
}

// Função para verificar se o servidor está pronto
async function waitForServer(browser, maxRetries = 10) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const page = await browser.newPage();
      await page.goto(`${BASE_URL}/`, { timeout: 5000, waitUntil: 'domcontentloaded' });
      await page.close();
      return true;
    } catch (error) {
      if (i < maxRetries - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      } else {
        return false;
      }
    }
  }
  return false;
}

// Função para renderizar uma rota com Puppeteer
async function renderRoute(browser, route) {
  try {
    const page = await browser.newPage();
    
    // Configurar viewport
    await page.setViewport({ width: 1920, height: 1080 });
    
    // Navegar para a rota
    const url = `${BASE_URL}${route}`;
    console.log(`  📄 Renderizando: ${route}`);
    
    await page.goto(url, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });

    // Aguardar React Query completar - verificar se há queries pendentes
    try {
      await page.waitForFunction(
        () => {
          // Verificar se React Query está pronto
          const reactQueryReady = window.__REACT_QUERY_STATE__ === undefined || 
            (typeof window.__REACT_QUERY_STATE__ !== 'undefined' && 
             Object.keys(window.__REACT_QUERY_STATE__?.queries || {}).length > 0);
          
          // Verificar se não há elementos com loading states visíveis
          const loadingElements = document.querySelectorAll('[data-loading="true"], .loading, [aria-busy="true"]');
          const hasLoadingElements = loadingElements.length > 0;
          
          // Verificar se imagens críticas carregaram
          const criticalImages = document.querySelectorAll('img[fetchpriority="high"], img[loading="eager"]');
          let imagesLoaded = true;
          criticalImages.forEach(img => {
            if (!img.complete) imagesLoaded = false;
          });
          
          return !hasLoadingElements && imagesLoaded;
        },
        { timeout: 10000 }
      );
    } catch (e) {
      // Se timeout, continuar mesmo assim
      console.log(`    ⚠️  Timeout aguardando queries (continuando...)`);
    }

    // Aguardar um pouco mais para garantir que React terminou de renderizar
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Aguardar todas as imagens críticas carregarem
    try {
      await page.evaluate(() => {
        return Promise.all(
          Array.from(document.querySelectorAll('img[fetchpriority="high"], img[loading="eager"]'))
            .map(img => {
              if (img.complete) return Promise.resolve();
              return new Promise((resolve, reject) => {
                img.onload = resolve;
                img.onerror = resolve; // Resolver mesmo se erro para não travar
                setTimeout(resolve, 3000); // Timeout de segurança
              });
            })
        );
      });
    } catch (e) {
      // Continuar mesmo se houver erro
    }

    // Obter HTML renderizado
    const html = await page.content();
    
    await page.close();
    
    return html;
  } catch (error) {
    console.error(`  ❌ Erro ao renderizar ${route}:`, error.message);
    return null;
  }
}

// Função para salvar HTML em arquivo
function saveHTML(route, html) {
  if (!html) return;

  // Determinar caminho do arquivo
  let filePath;
  if (route === '' || route === '/') {
    filePath = join(DIST_DIR, 'index.html');
  } else {
    // Remover barra inicial
    const cleanRoute = route.startsWith('/') ? route.slice(1) : route;
    const routeDir = join(DIST_DIR, cleanRoute);
    
    // Criar diretório se não existir
    if (!existsSync(routeDir)) {
      mkdirSync(routeDir, { recursive: true });
    }
    
    filePath = join(routeDir, 'index.html');
  }

  // Salvar HTML
  writeFileSync(filePath, html, 'utf-8');
  console.log(`  ✅ Salvo: ${filePath}`);
}

// Função para gerar sitemap.xml diretamente (sem Puppeteer)
async function generateSitemapXML() {
  const BASE_URL_SITEMAP = 'https://tenryu.com.br';
  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Rotas estáticas
  const staticRoutesForSitemap = [
    { path: '', priority: '1.0', changefreq: 'weekly' },
    { path: '/creditos', priority: '0.5', changefreq: 'yearly' },
  ];

  // Adicionar rotas estáticas
  staticRoutesForSitemap.forEach((route) => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL_SITEMAP}${route.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  // Salvar arquivo XML diretamente no dist
  const sitemapPath = join(DIST_DIR, 'sitemap.xml');
  writeFileSync(sitemapPath, xml, 'utf-8');
  
  // Verificar se o arquivo foi criado corretamente
  if (existsSync(sitemapPath)) {
    const stats = statSync(sitemapPath);
    console.log(`  ✅ Sitemap XML gerado: ${sitemapPath}`);
    console.log(`     Tamanho: ${stats.size} bytes`);
    
    // Verificar se começa com XML válido
    const content = readFileSync(sitemapPath, 'utf-8');
    if (content.startsWith('<?xml')) {
      console.log(`     ✅ Arquivo XML válido`);
    } else {
      console.warn(`     ⚠️  Arquivo não começa com <?xml`);
    }
  } else {
    console.error(`  ❌ Erro: Arquivo não foi criado em ${sitemapPath}`);
  }
}

// Função principal
async function prerender() {
  console.log('🚀 Iniciando prerendering...\n');

  // Verificar se dist existe
  if (!existsSync(DIST_DIR)) {
    console.error('❌ Diretório dist não encontrado. Execute "vite build" primeiro.');
    process.exit(1);
  }

  const allRoutes = [...staticRoutes];

  console.log(`\n📋 Total de rotas para renderizar: ${allRoutes.length}`);
  console.log(`   - Rotas estáticas: ${staticRoutes.length}\n`);

  // Iniciar servidor local
  const server = await startLocalServer();
  
  // Iniciar Puppeteer
  console.log('🌐 Iniciando Puppeteer...');
  
  // Configurar executável do Chromium se estiver definido (Docker)
  const executablePath = process.env.PUPPETEER_EXECUTABLE_PATH;
  
  const launchOptions = {
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
    ],
  };
  
  if (executablePath) {
    launchOptions.executablePath = executablePath;
  }
  
  const browser = await puppeteer.launch(launchOptions);

  console.log('✅ Puppeteer iniciado');
  
  // Aguardar servidor estar pronto
  console.log('⏳ Aguardando servidor estar pronto...');
  const serverReady = await waitForServer(browser);
  
  if (!serverReady) {
    console.error('❌ Servidor não está respondendo. Encerrando...');
    await browser.close();
    if (server) server.kill();
    process.exit(1);
  }
  
  console.log('✅ Servidor pronto\n');

  // Gerar sitemap.xml diretamente (sem Puppeteer)
  console.log('📄 Gerando sitemap.xml...');
  await generateSitemapXML();

  // Renderizar cada rota
  let successCount = 0;
  let errorCount = 0;

  for (const route of allRoutes) {
    const html = await renderRoute(browser, route);
    if (html) {
      saveHTML(route, html);
      successCount++;
    } else {
      errorCount++;
    }
  }

  // Fechar browser
  await browser.close();
  
  // Fechar servidor preview
  if (server) {
    console.log('🛑 Encerrando servidor preview...');
    server.kill();
  }

  console.log('\n✅ Prerendering concluído!');
  console.log(`   - Sucesso: ${successCount}`);
  console.log(`   - Erros: ${errorCount}`);
  console.log(`   - Total: ${allRoutes.length}`);
}

// Executar
prerender().catch((error) => {
  console.error('❌ Erro ao executar prerendering:', error);
  process.exit(1);
});

