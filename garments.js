// G&M garment illustrations — flat-lay style SVGs with soft shading,
// natural curves, and small construction details (ribbing, stitching, drawstrings)
// so each category reads as an actual garment rather than a geometric placeholder.

const GARMENT_VIEWBOX = "0 0 240 300";

function hexToRgb(hex) {
  const n = parseInt(hex.replace("#", ""), 16);
  return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff };
}

function shade(hex, amt) {
  // amt negative = darker, positive = lighter
  const { r, g, b } = hexToRgb(hex);
  const f = (c) => Math.max(0, Math.min(255, c + amt));
  return `rgb(${f(r)},${f(g)},${f(b)})`;
}

function quoteTspans(lines, x, startY, lineHeight) {
  return lines.map((line, i) => `<tspan x="${x}" y="${startY + i * lineHeight}">${line}</tspan>`).join("");
}

const QUOTE_LINES = ["IT'S AMAZING", "HOW WE KEEP", "LOVING THIS", "COUNTRY, AND", "THIS COUNTRY"];

// Smooth, natural garment outlines built with bezier curves rather than straight polygons.
const GARMENT_BODY = {
  "T-shirt": `M92,10 C104,2 136,2 148,10
    C160,20 178,26 198,42 C216,56 232,68 240,84
    C228,96 214,106 202,114 C196,104 190,98 184,92
    L184,270 C184,278 180,282 172,282 L68,282 C60,282 56,278 56,270
    L56,92 C50,98 44,104 38,114 C26,106 12,96 0,84
    C8,68 24,56 42,42 C62,26 80,20 92,10 Z`,
  "Long Sleeve": `M92,10 C104,2 136,2 148,10
    C162,20 184,28 208,48 C226,64 238,84 240,110
    C230,122 216,132 204,138 C198,126 190,116 182,108
    L182,270 C182,278 178,282 170,282 L70,282 C62,282 58,278 58,270
    L58,108 C50,116 42,126 36,138 C24,132 10,122 0,110
    C2,84 14,64 32,48 C56,28 78,20 92,10 Z`,
  "Sweater": `M92,10 C104,2 136,2 148,10
    C162,20 184,28 208,48 C226,64 238,84 240,110
    C230,122 216,132 204,138 C198,126 190,116 182,108
    L182,270 C182,278 178,282 170,282 L70,282 C62,282 58,278 58,270
    L58,108 C50,116 42,126 36,138 C24,132 10,122 0,110
    C2,84 14,64 32,48 C56,28 78,20 92,10 Z`,
  "Hoodie": `M94,14 C106,6 134,6 146,14
    C160,24 184,32 208,52 C226,68 238,88 240,114
    C230,126 216,136 204,142 C198,130 190,120 182,112
    L182,270 C182,278 178,282 170,282 L70,282 C62,282 58,278 58,270
    L58,112 C50,120 42,130 36,142 C24,136 10,126 0,114
    C2,88 14,68 32,52 C56,32 80,24 94,14 Z`,
};

function collarPath(category) {
  // A small inset curve at the neckline so it doesn't read as a flat edge.
  if (category === "Hoodie") return "";
  return `<path d="M100,10 C108,20 132,20 140,10" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="2"/>`;
}

function garmentSVG(category, fill, ink, opts = {}) {
  const fontSize = opts.fontSize || 15;
  const lineHeight = fontSize * 1.15;
  const startY = 158 - ((QUOTE_LINES.length - 1) * lineHeight) / 2;
  const bodyPath = GARMENT_BODY[category] || GARMENT_BODY["T-shirt"];
  const uid = `g${Math.random().toString(36).slice(2, 9)}`;

  const light = shade(fill, 26);
  const dark = shade(fill, -30);
  const darker = shade(fill, -55);
  const shadowColor = shade(fill, -70);

  let extras = "";

  if (category === "Hoodie") {
    extras += `
      <path d="M80,18 C90,-18 150,-18 160,18 C154,30 148,34 140,34 L100,34 C92,34 86,30 80,18 Z"
        fill="url(#${uid}-body)" stroke="${dark}" stroke-width="2"/>
      <path d="M96,34 C104,40 136,40 144,34" fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="2"/>
      <rect x="70" y="204" width="100" height="56" rx="12" fill="${dark}" opacity="0.9"/>
      <path d="M70,214 L170,214" stroke="${darker}" stroke-width="1.5" opacity="0.6"/>
      <path d="M112,26 C110,44 106,64 104,80" stroke="${ink}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <path d="M128,26 C130,44 134,64 136,80" stroke="${ink}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <circle cx="104" cy="82" r="4" fill="${ink}"/>
      <circle cx="136" cy="82" r="4" fill="${ink}"/>
    `;
  }

  if (category === "Sweater") {
    extras += `
      <path d="M58,258 C90,268 150,268 182,258 L182,270 C182,278 178,282 170,282 L70,282 C62,282 58,278 58,270 Z"
        fill="${dark}"/>
      <path d="M62,260 L178,260 M62,266 L178,266 M62,272 L178,272"
        stroke="${darker}" stroke-width="1" opacity="0.5"/>
      <path d="M0,110 C10,120 22,128 36,132 L44,110 C30,104 16,98 4,90 Z" fill="${dark}" opacity="0.85"/>
      <path d="M240,110 C230,120 218,128 204,132 L196,110 C210,104 224,98 236,90 Z" fill="${dark}" opacity="0.85"/>
      <path d="M104,10 C112,20 128,20 136,10" fill="none" stroke="rgba(0,0,0,0.28)" stroke-width="2.5"/>
    `;
  }

  // Soft fabric folds — a few faint curved lines for dimensionality, not literal wrinkles.
  const folds = `
    <path d="M78,120 C86,160 84,200 76,240" stroke="${dark}" stroke-width="2" fill="none" opacity="0.35"/>
    <path d="M162,120 C154,160 156,200 164,240" stroke="${dark}" stroke-width="2" fill="none" opacity="0.35"/>
    <path d="M70,96 C110,106 130,106 170,96" stroke="${light}" stroke-width="2" fill="none" opacity="0.4"/>
  `;

  return `
    <svg viewBox="${GARMENT_VIEWBOX}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${category} in a G&amp;M colorway">
      <defs>
        <linearGradient id="${uid}-body" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="${light}"/>
          <stop offset="55%" stop-color="${fill}"/>
          <stop offset="100%" stop-color="${dark}"/>
        </linearGradient>
        <filter id="${uid}-shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="${shadowColor}" flood-opacity="0.35"/>
        </filter>
      </defs>

      <ellipse cx="120" cy="288" rx="88" ry="10" fill="${shadowColor}" opacity="0.18"/>

      <g filter="url(#${uid}-shadow)">
        <path d="${bodyPath}" fill="url(#${uid}-body)" stroke="${dark}" stroke-width="2.5"/>
        ${collarPath(category)}
        ${folds}
        ${extras}
      </g>

      <text text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="${fontSize}" fill="${ink}" letter-spacing="0.3">
        ${quoteTspans(QUOTE_LINES, 120, startY, lineHeight)}
      </text>
    </svg>
  `;
}
