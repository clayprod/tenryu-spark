import { useEffect } from 'react';

interface OrganizationSchemaProps {
  name?: string;
  url?: string;
  logo?: string;
  description?: string;
  address?: {
    addressLocality: string;
    addressRegion: string;
    addressCountry: string;
  };
  contactPoint?: {
    telephone: string;
    contactType: string;
    availableLanguage: string;
  };
  email?: string;
  sameAs?: string[];
}

interface ServiceSchemaProps {
  name: string;
  description: string;
  provider?: {
    name: string;
    url: string;
  };
  areaServed?: string;
  serviceType?: string;
}

export const OrganizationSchema: React.FC<OrganizationSchemaProps> = ({
  name = 'Tenryu Consulting',
  url = 'https://tenryu.com.br',
  logo = 'https://tenryu.com.br/logo.png',
  description = 'Consultoria especializada em desenvolvimento de produtos, negócios e importação com expertise internacional',
  address = {
    addressLocality: 'São Paulo',
    addressRegion: 'SP',
    addressCountry: 'BR',
  },
  contactPoint = {
    telephone: '+55-11-94190-1424',
    contactType: 'customer service',
    availableLanguage: 'Portuguese',
  },
  email = 'clayton@tenryu.com.br',
  sameAs = ['https://instagram.com/tenryucombr'],
}) => {
  useEffect(() => {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name,
      alternateName: 'tenryu',
      url,
      logo,
      description,
      address: {
        '@type': 'PostalAddress',
        ...address,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        ...contactPoint,
      },
      email,
      sameAs,
      foundingDate: '2024',
      founder: {
        '@type': 'Person',
        name: 'Clayton Costa',
      },
      serviceArea: {
        '@type': 'Country',
        name: 'Brazil',
      },
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'organization-schema';
    script.text = JSON.stringify(structuredData, null, 2);

    const existingScript = document.getElementById('organization-schema');
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById('organization-schema');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [name, url, logo, description, address, contactPoint, email, sameAs]);

  return null;
};

export const ServiceSchema: React.FC<ServiceSchemaProps> = ({
  name,
  description,
  provider = {
    name: 'Tenryu Consulting',
    url: 'https://tenryu.com.br',
  },
  areaServed = 'Brazil',
  serviceType,
}) => {
  useEffect(() => {
    const structuredData: any = {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name,
      description,
      provider: {
        '@type': 'Organization',
        ...provider,
      },
      areaServed: {
        '@type': 'Country',
        name: areaServed,
      },
    };

    if (serviceType) {
      structuredData.serviceType = serviceType;
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = `service-schema-${name.replace(/\s+/g, '-').toLowerCase()}`;
    script.text = JSON.stringify(structuredData, null, 2);

    const existingScript = document.getElementById(script.id);
    if (existingScript) {
      existingScript.remove();
    }

    document.head.appendChild(script);

    return () => {
      const scriptToRemove = document.getElementById(script.id);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [name, description, provider, areaServed, serviceType]);

  return null;
};

