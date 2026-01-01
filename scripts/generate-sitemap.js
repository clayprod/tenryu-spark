import { writeFileSync, existsSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const BASE_URL = 'https://tenryu.com.br';

// Rotas estáticas do site
const staticRoutes = [
  { path: '', priority: '1.0', changefreq: 'weekly' },
  { path: '/creditos', priority: '0.5', changefreq: 'yearly' },
];

async function generateSitemap() {
  const currentDate = new Date().toISOString().split('T')[0];
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  // Adicionar rotas estáticas
  staticRoutes.forEach((route) => {
    xml += '  <url>\n';
    xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
    xml += `    <lastmod>${currentDate}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  // Salvar arquivo em public/sitemap.xml (para desenvolvimento)
  const publicPath = join(__dirname, '..', 'public', 'sitemap.xml');
  writeFileSync(publicPath, xml, 'utf-8');
  console.log(`✅ Sitemap gerado em public: ${publicPath}`);
  
  // Se dist existe, também salvar lá (para build - será sobrescrito pelo prerender)
  const distPath = join(__dirname, '..', 'dist', 'sitemap.xml');
  const distDir = join(__dirname, '..', 'dist');
  if (existsSync(distDir)) {
    writeFileSync(distPath, xml, 'utf-8');
    console.log(`✅ Sitemap gerado em dist: ${distPath}`);
  }
  
  console.log(`   Total de URLs: ${staticRoutes.length}`);
  
  // Verificar se o arquivo foi criado corretamente
  if (existsSync(publicPath)) {
    const content = readFileSync(publicPath, 'utf-8');
    if (!content.startsWith('<?xml')) {
      console.error('❌ ERRO: Arquivo sitemap.xml não começa com <?xml!');
      console.error(`   Primeiros 100 caracteres: ${content.substring(0, 100)}`);
      process.exit(1);
    }
  }
}

// Executar
generateSitemap().catch((error) => {
  console.error('❌ Erro ao gerar sitemap:', error);
  process.exit(1);
});

