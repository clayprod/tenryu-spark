import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  const location = useLocation();

  // Gerar breadcrumbs automáticos baseados na rota se não fornecidos
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    if (items) return items;

    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', path: '/' }
    ];

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Mapear segmentos para labels amigáveis
      const labels: Record<string, string> = {
        'creditos': 'Créditos',
        'credits': 'Credits',
      };

      const label = labels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');
      breadcrumbs.push({ label, path: currentPath });
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Gerar dados estruturados Schema.org BreadcrumbList
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
        item: `https://tenryu.com.br${item.path}`,
      })),
    };

    // Remover script anterior se existir
    const existingScript = document.getElementById('breadcrumb-schema');
    if (existingScript) {
      existingScript.remove();
    }

    // Criar e adicionar script de dados estruturados
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'breadcrumb-schema';
    script.text = JSON.stringify(structuredData, null, 2);
    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('breadcrumb-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [breadcrumbs]);

  if (breadcrumbs.length <= 1) {
    return null; // Não mostrar breadcrumbs na home
  }

  return (
    <nav aria-label="Breadcrumb" className="container-tenryu py-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm" itemScope itemType="https://schema.org/BreadcrumbList">
        {breadcrumbs.map((item, index) => {
          const isLast = index === breadcrumbs.length - 1;
          
          return (
            <li
              key={item.path}
              className="flex items-center"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {isLast ? (
                <>
                  <span className="text-muted-foreground font-medium" itemProp="name">
                    {item.label}
                  </span>
                  <meta itemProp="item" content={`https://tenryu.com.br${item.path}`} />
                  <meta itemProp="position" content={String(index + 1)} />
                </>
              ) : (
                <>
                  <Link
                    to={item.path}
                    className="text-primary hover:text-primary/80 transition-colors"
                    itemProp="item"
                  >
                    <span itemProp="name">{item.label}</span>
                  </Link>
                  <meta itemProp="position" content={String(index + 1)} />
                  <span className="mx-2 text-muted-foreground">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

