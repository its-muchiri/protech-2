export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'Kenya Consultancy',
          description: 'Leading multi-service consultancy in Kenya providing construction, solar, plumbing, security, and professional services nationwide.',
          url: 'https://www.yourdomain.co.ke',
          telephone: '+254700000000',
          email: 'sales@yourdomain.co.ke',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Nairobi',
            addressLocality: 'Nairobi',
            addressRegion: 'Nairobi',
            addressCountry: 'KE',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: -1.286389,
            longitude: 36.817223,
          },
          openingHours: 'Mo-Sa 08:00-18:00',
          priceRange: 'KES',
          areaServed: {
            '@type': 'Country',
            name: 'Kenya',
          },
          sameAs: [
            'https://www.facebook.com/yourdomain',
            'https://twitter.com/yourdomain',
            'https://www.instagram.com/yourdomain',
            'https://www.linkedin.com/company/yourdomain',
          ],
        }),
      }}
    />
  );
}

export function FAQPageSchema({ faqs }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.answer,
            },
          })),
        }),
      }}
    />
  );
}

export function ServicePageSchema({ service, description, url }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: service,
          description: description,
          url: url,
          provider: {
            '@type': 'LocalBusiness',
            name: 'Kenya Consultancy',
            telephone: '+254700000000',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Nairobi',
              addressRegion: 'Nairobi',
              addressCountry: 'KE',
            },
          },
          areaServed: {
            '@type': 'Country',
            name: 'Kenya',
          },
        }),
      }}
    />
  );
}