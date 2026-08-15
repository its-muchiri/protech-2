export function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'LocalBusiness',
          name: 'ProTech Consulting',
          description: 'Leading multi-service consultancy in Kenya providing construction, solar, plumbing, security, and professional services nationwide.',
          url: 'https://www.protech.co.ke',
          telephone: '+254725310112',
          email: 'protech.ke.group@gmail.com',
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
            'https://www.facebook.com/protechconsultants',
            'https://twitter.com/protechconsultants',
            'https://www.instagram.com/protechconsultants',
            'https://www.linkedin.com/company/protechconsultants',
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
            name: 'ProTech Consulting',
            telephone: '+254725310112',
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