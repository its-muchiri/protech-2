const WHATSAPP_NUMBER = process.env.WHATSAPP_NUMBER || '254700000000';

export function buildWhatsAppUrl(message, phone = WHATSAPP_NUMBER) {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encodedMessage}`;
}

export function buildPreFilledMessage(pageTitle, serviceName, userLocation = 'Kenya') {
  return `Hello, I am visiting your website on the ${pageTitle} page. I am interested in getting a quote for ${serviceName} in ${userLocation}. Please assist me.`;
}

export function getWhatsAppNumber() {
  return WHATSAPP_NUMBER;
}