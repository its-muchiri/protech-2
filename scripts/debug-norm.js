const normalize = (s) => s.replace(/\[[^\]]+\]/g, '').replace(/\s+:/g, ':').replace(/''/g, "'").trim();
const title = '10 Day Kenya Tanzania Tour Sale : Complete Guide';
const h1 = '10 Day Kenya Tanzania Tour Sale [Season]: Complete Guide';
console.log('title normalized:', normalize(title));
console.log('h1 normalized:', normalize(h1));
console.log('match:', normalize(title) === normalize(h1));