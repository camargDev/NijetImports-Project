// Ilustrações vetoriais ORIGINAIS geradas por código (sem fotos de terceiros, sem logotipos de marcas).
// Todas as ilustrações são genéricas; não reproduzem o design de nenhum produto específico.

const uid = (() => { let n = 0; return (p) => `${p}${++n}`; })();

const phoneBack = ({ x, y, w = 300, h = 610, rot = 0, c1, c2, camera = 'triple' }) => {
  const id = uid('pb');
  const cx = x + w / 2, cy = y + h / 2;
  const lens = (lx, ly, r) => `
    <circle cx="${lx}" cy="${ly}" r="${r}" fill="#0b0d12"/>
    <circle cx="${lx}" cy="${ly}" r="${r * 0.78}" fill="#232833"/>
    <circle cx="${lx}" cy="${ly}" r="${r * 0.46}" fill="#0b0d12"/>
    <circle cx="${lx - r * 0.2}" cy="${ly - r * 0.22}" r="${r * 0.14}" fill="#8fa3c9" opacity=".7"/>`;
  const cam = camera === 'triple'
    ? `<rect x="${x + 26}" y="${y + 26}" width="138" height="138" rx="38" fill="rgba(0,0,0,.28)" stroke="rgba(255,255,255,.28)"/>
       ${lens(x + 70, y + 70, 24)}${lens(x + 70, y + 122, 24)}${lens(x + 122, y + 96, 24)}
       <circle cx="${x + 138}" cy="${y + 52}" r="7" fill="#f3e9c9" opacity=".9"/>`
    : `<circle cx="${x + w / 2}" cy="${y + 96}" r="66" fill="rgba(0,0,0,.3)" stroke="rgba(255,255,255,.3)" stroke-width="2"/>
       ${lens(x + w / 2, y + 96, 44)}
       <circle cx="${x + w / 2 + 70}" cy="${y + 40}" r="8" fill="#f3e9c9" opacity=".9"/>`;
  return `
  <g transform="rotate(${rot} ${cx} ${cy})">
    <defs>
      <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
      <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".34"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient>
    </defs>
    <ellipse cx="${cx}" cy="${y + h + 22}" rx="${w * 0.5}" ry="20" fill="#0b1220" opacity=".16"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="58" fill="url(#${id})"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="58" fill="url(#${id}g)"/>
    <rect x="${x + 2}" y="${y + 2}" width="${w - 4}" height="${h - 4}" rx="56" fill="none" stroke="rgba(255,255,255,.42)" stroke-width="3"/>
    ${cam}
  </g>`;
};

const phoneFront = ({ x, y, w = 300, h = 610, rot = 0, c1, c2 }) => {
  const id = uid('pf');
  const cx = x + w / 2, cy = y + h / 2;
  return `
  <g transform="rotate(${rot} ${cx} ${cy})">
    <defs>
      <radialGradient id="${id}" cx=".3" cy=".25" r="1.1"><stop offset="0" stop-color="${c1}"/><stop offset=".7" stop-color="${c2}"/><stop offset="1" stop-color="#0b1220"/></radialGradient>
    </defs>
    <ellipse cx="${cx}" cy="${y + h + 22}" rx="${w * 0.5}" ry="20" fill="#0b1220" opacity=".16"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="58" fill="#14161c"/>
    <rect x="${x + 3}" y="${y + 3}" width="${w - 6}" height="${h - 6}" rx="55" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="2"/>
    <rect x="${x + 12}" y="${y + 12}" width="${w - 24}" height="${h - 24}" rx="47" fill="url(#${id})"/>
    <rect x="${cx - 44}" y="${y + 28}" width="88" height="26" rx="13" fill="#05060a"/>
    <path d="M${x + 60} ${y + h * 0.58} C ${x + 120} ${y + h * 0.42}, ${x + 200} ${y + h * 0.7}, ${x + w - 40} ${y + h * 0.52}" stroke="rgba(255,255,255,.22)" stroke-width="3" fill="none"/>
    <rect x="${cx - 52}" y="${y + h - 34}" width="104" height="5" rx="2.5" fill="rgba(255,255,255,.7)"/>
  </g>`;
};

const perfumeBottle = ({ x, y, c1, c2, w = 230, h = 330, boxTilt = -10 }) => {
  const id = uid('pf');
  const cx = x + w / 2;
  const ornament = (ox, oy) => `
    <g stroke="rgba(255,255,255,.55)" stroke-width="2" fill="none">
      <path d="M${ox} ${oy} l22 -22 l22 22 l-22 22 z"/><path d="M${ox + 8} ${oy} l14 -14 l14 14 l-14 14 z"/>
    </g>`;
  return `
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
    <linearGradient id="${id}v" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".5" stop-color="#fff" stop-opacity=".1"/><stop offset="1" stop-color="#fff" stop-opacity=".35"/></linearGradient>
  </defs>
  <g transform="rotate(${boxTilt} ${x + 30} ${y + h})">
    <rect x="${x - 120}" y="${y + 40}" width="210" height="${h - 30}" rx="14" fill="url(#${id})"/>
    <rect x="${x - 106}" y="${y + 54}" width="182" height="${h - 58}" rx="8" fill="none" stroke="rgba(255,255,255,.5)" stroke-width="2"/>
    ${ornament(x - 15, y + 150)}
  </g>
  <ellipse cx="${cx + 20}" cy="${y + h + 20}" rx="150" ry="18" fill="#0b1220" opacity=".16"/>
  <rect x="${cx - 38}" y="${y - 40}" width="76" height="70" rx="12" fill="url(#${id})"/>
  <rect x="${cx - 38}" y="${y - 40}" width="76" height="70" rx="12" fill="url(#${id}v)"/>
  <rect x="${cx - 24}" y="${y + 26}" width="48" height="22" fill="#cfd4dc"/>
  <rect x="${x}" y="${y + 44}" width="${w}" height="${h - 44}" rx="30" fill="#eef1f6" opacity=".92"/>
  <rect x="${x + 14}" y="${y + 120}" width="${w - 28}" height="${h - 150}" rx="22" fill="url(#${id})" opacity=".85"/>
  <rect x="${x}" y="${y + 44}" width="${w}" height="${h - 44}" rx="30" fill="url(#${id}v)"/>
  <rect x="${cx - 62}" y="${y + 170}" width="124" height="88" rx="10" fill="rgba(255,255,255,.88)"/>
  <g stroke="${c2}" stroke-width="3" fill="none"><path d="M${cx - 44} ${y + 200} h88"/><path d="M${cx - 30} ${y + 220} h60"/><circle cx="${cx}" cy="${y + 242}" r="6"/></g>`;
};

const splashBottle = ({ x, y, c1, c2 }) => {
  const id = uid('sp');
  return `
  <defs>
    <linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
    <linearGradient id="${id}v" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/></linearGradient>
  </defs>
  <ellipse cx="${x + 100}" cy="${y + 440}" rx="130" ry="18" fill="#0b1220" opacity=".16"/>
  <rect x="${x + 82}" y="${y - 70}" width="76" height="40" rx="10" fill="#2b2f3a"/>
  <rect x="${x + 100}" y="${y - 30}" width="40" height="40" fill="#cfd4dc"/>
  <rect x="${x}" y="${y + 10}" width="200" height="420" rx="44" fill="url(#${id})"/>
  <rect x="${x}" y="${y + 10}" width="200" height="420" rx="44" fill="url(#${id}v)"/>
  <rect x="${x + 28}" y="${y + 150}" width="144" height="150" rx="14" fill="rgba(255,255,255,.88)"/>
  <g stroke="${c2}" stroke-width="3" fill="none"><path d="M${x + 52} ${y + 196} h96"/><path d="M${x + 66} ${y + 222} h68"/><path d="M${x + 80} ${y + 248} h40"/></g>`;
};

const accessory = ({ x, y }) => `
  <ellipse cx="${x + 200}" cy="${y + 420}" rx="220" ry="18" fill="#0b1220" opacity=".14"/>
  <g>
    <rect x="${x + 70}" y="${y + 60}" width="26" height="60" rx="5" fill="#b8bcc6"/>
    <rect x="${x + 124}" y="${y + 60}" width="26" height="60" rx="5" fill="#b8bcc6"/>
    <rect x="${x + 30}" y="${y + 110}" width="160" height="190" rx="34" fill="#fff" stroke="#d5d8df" stroke-width="3"/>
    <rect x="${x + 70}" y="${y + 250}" width="80" height="22" rx="11" fill="#e3e6ec"/>
  </g>
  <path d="M${x + 110} ${y + 300} C ${x + 110} ${y + 420}, ${x + 300} ${y + 330}, ${x + 270} ${y + 230} C ${x + 250} ${y + 160}, ${x + 360} ${y + 140}, ${x + 360} ${y + 220}"
        stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round"/>
  <path d="M${x + 110} ${y + 300} C ${x + 110} ${y + 420}, ${x + 300} ${y + 330}, ${x + 270} ${y + 230} C ${x + 250} ${y + 160}, ${x + 360} ${y + 140}, ${x + 360} ${y + 220}"
        stroke="#d5d8df" stroke-width="3" fill="none" stroke-linecap="round" opacity=".9"/>
  <rect x="${x + 340}" y="${y + 200}" width="40" height="84" rx="10" fill="#fff" stroke="#d5d8df" stroke-width="3"/>
  <rect x="${x + 350}" y="${y + 284}" width="20" height="26" rx="4" fill="#b8bcc6"/>`;

const check = (cx, cy, r = 46) => `
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#1d4ed8"/>
  <path d="M${cx - r * 0.42} ${cy + 2} l${r * 0.28} ${r * 0.3} l${r * 0.56} -${r * 0.62}" stroke="#fff" stroke-width="${r * 0.16}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;

const svg = (w, h, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-hidden="true" focusable="false">${body}</svg>\n`;

/** Retorna { file, width, height, svg } para cada tipo de ilustração. */
export function renderArt(kind, c = {}) {
  const c1 = c.c1 || '#4f86c6', c2 = c.c2 || '#1d3f73';
  switch (kind) {
    case 'phone':
      return svg(800, 800, phoneBack({ x: 270, y: 80, rot: -6, c1, c2 }));
    case 'phoneRound':
      return svg(800, 800, phoneBack({ x: 270, y: 80, rot: 5, c1, c2, camera: 'round' }));
    case 'perfume':
      return svg(800, 800, perfumeBottle({ x: 370, y: 190, c1, c2 }));
    case 'splash':
      return svg(800, 800, splashBottle({ x: 300, y: 190, c1, c2 }));
    case 'accessory':
      return svg(800, 800, accessory({ x: 200, y: 160 }));
    case 'hero':
      return svg(1200, 900,
        phoneBack({ x: 470, y: 90, w: 320, h: 650, rot: 7, c1: '#6d5a92', c2: '#2b2340' }) +
        phoneFront({ x: 230, y: 150, w: 320, h: 650, rot: -9, c1: '#6aa0ff', c2: '#3a2f7a' }));
    case 'quality':
      return svg(1200, 900,
        phoneFront({ x: 400, y: 120, w: 340, h: 690, rot: 0, c1: '#9ec1ff', c2: '#2c3d86' }) +
        check(790, 250, 58) + check(330, 560, 44));
    case 'tech':
      return svg(1200, 900,
        phoneBack({ x: 250, y: 140, w: 320, h: 650, rot: -7, c1: '#4f86c6', c2: '#1d3f73' }) +
        phoneBack({ x: 600, y: 110, w: 320, h: 650, rot: 6, c1: '#5f9c8a', c2: '#1f4a3f', camera: 'round' }));
    case 'you':
      return svg(1200, 900,
        perfumeBottle({ x: 420, y: 250, c1: '#d8b36a', c2: '#8a6a2b', boxTilt: -8 }) +
        accessory({ x: 700, y: 330 }).replace(/<ellipse[^>]*\/>/, ''));
    default:
      throw new Error(`Arte desconhecida: ${kind}`);
  }
}

export const ART_DIMENSIONS = {
  phone: [800, 800], phoneRound: [800, 800], perfume: [800, 800], splash: [800, 800], accessory: [800, 800],
  hero: [1200, 900], quality: [1200, 900], tech: [1200, 900], you: [1200, 900],
};
