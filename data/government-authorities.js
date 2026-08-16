export const governmentAuthorities = [
  {
    id: 'epra',
    name: 'Energy & Petroleum Regulatory Authority',
    shortName: 'EPRA',
    logo: '/protech-img/government-authorities/epra.png',
    url: 'https://www.epra.go.ke',
    description: 'Regulates energy and petroleum sectors in Kenya',
    category: 'regulator'
  },
  {
    id: 'nema',
    name: 'National Environment Management Authority',
    shortName: 'NEMA',
    logo: '/protech-img/government-authorities/nema.png',
    url: 'https://www.nema.go.ke',
    description: 'Environmental regulation and compliance',
    category: 'regulator'
  },
  {
    id: 'moh',
    name: 'Ministry of Health',
    shortName: 'MOH',
    logo: '/protech-img/government-authorities/ministry of helth.jpg',
    url: 'https://www.health.go.ke',
    description: 'Health policy and regulation in Kenya',
    category: 'ministry'
  },
  {
    id: 'erc',
    name: 'Energy Regulatory Commission',
    shortName: 'ERC',
    logo: '/protech-img/government-authorities/European_Research_Council_logo.svg',
    url: 'https://www.erc.go.ke',
    description: 'Energy sector regulation (legacy commission)',
    category: 'regulator'
  }
];

export const getAuthoritiesByCategory = (category) => {
  return governmentAuthorities.filter(a => a.category === category);
};