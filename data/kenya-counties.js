export const kenyaCounties = [
  { id: 'nairobi', name: 'Nairobi City County', logo: '/protech-img/kenya-counties/Nairobi_City_Logo.png', url: 'https://nairobi.go.ke' },
  { id: 'kilifi', name: 'Kilifi County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Kilifi_County.png', url: 'https://kilifi.go.ke', altLogo: '/protech-img/kenya-counties/Seal_of_Kilifi_County.png' },
  { id: 'laikipia', name: 'Laikipia County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Laikipia_County.png', url: 'https://laikipia.go.ke', altLogo: '/protech-img/kenya-counties/Seal_of_Laikipia_County.png' },
  { id: 'meru', name: 'Meru County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Meru_County.png', url: 'https://meru.go.ke', altLogo: '/protech-img/kenya-counties/Seal_of_Meru_County.png' },
  { id: 'nyandarua', name: 'Nyandarua County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Nyandarua_County.png', url: 'https://nyandarua.go.ke', altLogo: '/protech-img/kenya-counties/Seal_of_Nyandarua_County.png' },
  { id: 'trans-nzoia', name: 'Trans-Nzoia County', logo: '/protech-img/kenya-counties/Tranz-Nzoia_County_Government_logo.png', url: 'https://transnzoia.go.ke' },
  { id: 'baringo', name: 'Baringo County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Baringo_County.png', url: 'https://baringo.go.ke' },
  { id: 'bomet', name: 'Bomet County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Bomet_County.png', url: 'https://bomet.go.ke' },
  { id: 'busia', name: 'Busia County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Busia_County.png', url: 'https://busia.go.ke' },
  { id: 'homa-bay', name: 'Homa Bay County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Homa_Bay_County.png', url: 'https://homabay.go.ke' },
  { id: 'kajiado', name: 'Kajiado County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Kajiado_County.png', url: 'https://kajiado.go.ke' },
  { id: 'mandera', name: 'Mandera County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Mandera_County.png', url: 'https://mandera.go.ke' },
  { id: 'marsabit', name: 'Marsabit County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Marsabit_County.png', url: 'https://marsabit.go.ke' },
  { id: 'muranga', name: 'Murang\'a County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Muranga_County.png', url: 'https://muranga.go.ke' },
  { id: 'samburu', name: 'Samburu County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Samburu_County.png', url: 'https://samburu.go.ke' },
  { id: 'siaya', name: 'Siaya County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Siaya_County.png', url: 'https://siaya.go.ke' },
  { id: 'taita-taveta', name: 'Taita Taveta County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Taita_Taveta_County.png', url: 'https://taitataveta.go.ke' },
  { id: 'tharaka-nithi', name: 'Tharaka-Nithi County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Tharaka-Nithi_County.png', url: 'https://tharakanithi.go.ke' },
  { id: 'vihiga', name: 'Vihiga County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Vihiga_County.png', url: 'https://vihiga.go.ke' },
  { id: 'wajir', name: 'Wajir County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_Wajir_County.png', url: 'https://wajir.go.ke' },
  { id: 'west-pokot', name: 'West Pokot County', logo: '/protech-img/kenya-counties/Coat_of_Arms_of_West_Pokot_County.png', url: 'https://westpokot.go.ke' },
  { id: 'embu', name: 'Embu County', logo: '/protech-img/kenya-counties/Embu_County_Government_logo.png', url: 'https://embu.go.ke' },
  { id: 'kericho', name: 'Kericho County', logo: '/protech-img/kenya-counties/Kericho_County_Government_logo.png', url: 'https://kericho.go.ke' },
  { id: 'kisumu', name: 'Kisumu County', logo: '/protech-img/kenya-counties/Kisumu_County_Government_logo.png', url: 'https://kisumu.go.ke' },
];

export const getCountyById = (id) => {
  return kenyaCounties.find(c => c.id === id);
};

export const getCountiesByRegion = (region) => {
  return kenyaCounties;
};