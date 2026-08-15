const CATEGORY_KEYWORDS = {
  Medical: [
    'medical', 'hospital', 'clinic', 'laboratory', 'lab ', 'surgical', 'equipment',
    'supplies', 'diagnostic', 'patient', 'ultrasound', 'x-ray', 'xray', 'scanner',
    'monitor', 'ventilator', 'sterilizer', 'autoclave', 'gloves', 'syringe',
    'wheelchair', 'oxygen', 'dental', 'pharmacy', 'pharma', 'microscope',
    'blood', 'anesthesia', 'dialysis', 'morgue', 'mortuary', 'infusion', 'suture',
    'dressing', 'bandage', 'ppe', 'test kit', 'reagent', 'analyzer',
  ],
  Safari: [
    'safari', 'mara', 'samburu', 'tsavo', 'amboseli', 'nakuru', 'meru',
    'aberdare', 'park', 'lodge', 'camp', 'tour', 'wildlife', 'migration',
    'elewana', 'governors', 'sarova', 'serena', 'angama', 'asilia', 'ashnil',
    'kilaguni', 'tortilis', 'porini', 'sirare', 'cheli', 'peacock', 'hornbill',
    'giraffe', 'tented', 'savannah', 'game drive', 'safari package',
  ],
  Flights: [
    'flight', 'airline', 'airport', 'airways', 'jambojet', 'safarilink',
    'qatar', 'emirates', 'etihad', 'kenya airways', 'domestic flight',
    'international flight', 'e-ticket', 'fly-in', 'fly in', 'book flight',
    'airline ticket', 'cheapest airline',
  ],
};

const CATEGORY_LABELS = {
  Medical: 'Medical Equipment',
  Safari: 'Safari & Travel',
  Flights: 'Flights & Travel',
  Services: 'Services & Guides',
};

export function categorizePost({ slug, title, primary_keyword } = {}) {
  const haystack = `${slug || ''} ${title || ''} ${primary_keyword || ''}`.toLowerCase();
  const scores = { Medical: 0, Safari: 0, Flights: 0 };

  Object.entries(CATEGORY_KEYWORDS).forEach(([cat, words]) => {
    words.forEach((w) => {
      if (haystack.includes(w)) scores[cat] += 1;
    });
  });

  if (scores.Safari >= scores.Medical && scores.Safari >= scores.Flights && scores.Safari > 0) {
    return { id: 'Safari', label: CATEGORY_LABELS.Safari };
  }
  if (scores.Flights >= scores.Medical && scores.Flights > 0) {
    return { id: 'Flights', label: CATEGORY_LABELS.Flights };
  }
  if (scores.Medical > 0) {
    return { id: 'Medical', label: CATEGORY_LABELS.Medical };
  }
  return { id: 'Services', label: CATEGORY_LABELS.Services };
}
