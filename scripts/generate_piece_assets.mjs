import { mkdir, writeFile } from "node:fs/promises";

const outDir = new URL("../assets/pieces/", import.meta.url);

const catPalettes = {
  "cat-orange": {
    body: "#f59b22",
    bodyDark: "#c46b13",
    face: "#ffd28a",
    marks: "#b85a14",
    ear: "#ff9dab",
    eye: "#2f2218",
    eyeShine: "#ffffff"
  },
  "cat-siamese": {
    body: "#f5dfbd",
    bodyDark: "#b98b5c",
    face: "#5b3825",
    marks: "#3f2418",
    ear: "#f3a08f",
    eye: "#3aa7d9",
    eyeShine: "#ffffff"
  },
  "cat-gray": {
    body: "#9ca3af",
    bodyDark: "#5b6470",
    face: "#c7ccd4",
    marks: "#5f6772",
    ear: "#ff9dab",
    eye: "#31251e",
    eyeShine: "#ffffff"
  },
  "cat-black": {
    body: "#202124",
    bodyDark: "#08090a",
    face: "#292b2e",
    marks: "#111214",
    ear: "#ff9dab",
    eye: "#f5c542",
    eyeShine: "#ffffff"
  },
  "cat-calico": {
    body: "#fff7e8",
    bodyDark: "#b56a2c",
    face: "#fff7e8",
    marks: "#2a1c16",
    patch: "#f58b1f",
    ear: "#ff9dab",
    eye: "#3a2a20",
    eyeShine: "#ffffff"
  },
  "cat-white": {
    body: "#f8fafc",
    bodyDark: "#b9c0ca",
    face: "#ffffff",
    marks: "#d6dde7",
    ear: "#ffb3c0",
    eye: "#36a3c9",
    eyeShine: "#ffffff"
  }
};

const yarnPalettes = {
  "yarn-pink": { body: "#ff6f9b", bodyDark: "#d73b70", bodyLight: "#ffb3c8" },
  "yarn-green": { body: "#95d82f", bodyDark: "#5c9e1e", bodyLight: "#cbf36b" },
  "yarn-yellow": { body: "#ffd33d", bodyDark: "#c98a13", bodyLight: "#ffe983" },
  "yarn-red": { body: "#ef3030", bodyDark: "#a91620", bodyLight: "#ff7771" },
  "yarn-blue": { body: "#27c6d6", bodyDark: "#10838f", bodyLight: "#79edf1" },
  "yarn-purple": { body: "#9c4bd5", bodyDark: "#64269a", bodyLight: "#d09af5" },
  "yarn-orange": { body: "#ff8a1f", bodyDark: "#b84d10", bodyLight: "#ffc166" }
};

function tileShell(inner, { shadow = "#7c3f18" } = {}) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <defs>
    <filter id="softShadow" x="-18%" y="-18%" width="136%" height="140%">
      <feDropShadow dx="0" dy="5" stdDeviation="3" flood-color="${shadow}" flood-opacity=".25"/>
    </filter>
    <linearGradient id="shine" x1="18" y1="12" x2="106" y2="116" gradientUnits="userSpaceOnUse">
      <stop offset="0" stop-color="#fff" stop-opacity=".38"/>
      <stop offset=".42" stop-color="#fff" stop-opacity=".08"/>
      <stop offset="1" stop-color="#000" stop-opacity=".08"/>
    </linearGradient>
  </defs>
  <g filter="url(#softShadow)">
    ${inner}
    <rect x="10" y="9" width="108" height="108" rx="18" fill="url(#shine)" opacity=".55"/>
    <path d="M28 17h72c7 0 12 5 12 12" fill="none" stroke="#fff" stroke-opacity=".38" stroke-width="4" stroke-linecap="round"/>
  </g>
</svg>`;
}

function catSvg(name, p) {
  const calicoPatches = name === "cat-calico"
    ? `<path d="M22 22c18-8 29-1 37 12-11 5-22 8-36 5z" fill="${p.patch}"/>
       <path d="M86 17c18 4 27 14 27 31-13-1-24-5-33-15z" fill="${p.marks}"/>
       <path d="M99 76c11 7 14 17 8 28-12-4-20-10-25-21z" fill="${p.patch}"/>`
    : "";

  const siameseMask = name === "cat-siamese"
    ? `<ellipse cx="64" cy="64" rx="33" ry="27" fill="${p.face}"/>`
    : `<ellipse cx="64" cy="73" rx="35" ry="25" fill="${p.face}" opacity=".95"/>`;

  const stripes = ["42", "54", "74", "86"].map((x, index) => (
    `<path d="M${x} 24c${index < 2 ? "-2" : "2"} 10-${index < 2 ? "4" : "-4"} 17-${index < 2 ? "6" : "-6"} 24" fill="none" stroke="${p.marks}" stroke-width="4" stroke-linecap="round" opacity=".72"/>`
  )).join("");

  return tileShell(`
    <rect x="10" y="9" width="108" height="108" rx="18" fill="${p.body}"/>
    <rect x="15" y="15" width="98" height="98" rx="15" fill="none" stroke="${p.bodyDark}" stroke-width="4" opacity=".55"/>
    ${calicoPatches}
    <path d="M24 43 38 20 52 46z" fill="${p.body}" stroke="${p.bodyDark}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M104 43 90 20 76 46z" fill="${p.body}" stroke="${p.bodyDark}" stroke-width="4" stroke-linejoin="round"/>
    <path d="M31 40 38 27 46 42z" fill="${p.ear}"/>
    <path d="M97 40 90 27 82 42z" fill="${p.ear}"/>
    ${stripes}
    ${siameseMask}
    <circle cx="45" cy="61" r="10" fill="${p.eye}"/>
    <circle cx="83" cy="61" r="10" fill="${p.eye}"/>
    <circle cx="49" cy="57" r="3.4" fill="${p.eyeShine}" opacity=".95"/>
    <circle cx="87" cy="57" r="3.4" fill="${p.eyeShine}" opacity=".95"/>
    <path d="M60 73c2-3 6-3 8 0 0 4-8 4-8 0z" fill="#ff7b8f"/>
    <path d="M64 77v5" stroke="#2c1b16" stroke-width="3" stroke-linecap="round"/>
    <path d="M50 84c5 8 12 8 14-1 2 9 10 9 15 1" fill="none" stroke="#2c1b16" stroke-width="4" stroke-linecap="round"/>
    <path d="M23 68h16M25 78h17M105 68H89M103 78H86" stroke="#2c1b16" stroke-width="3" stroke-linecap="round" opacity=".6"/>
  `, { shadow: p.bodyDark });
}

function yarnSvg(_name, p) {
  const strands = [
    "M31 85c17-31 37-49 69-54",
    "M23 66c31-24 57-34 82-32",
    "M33 99c19-29 45-46 75-51",
    "M26 44c30 3 55 16 74 43",
    "M47 24c22 15 38 38 49 73",
    "M22 77c24 9 50 12 82 5",
    "M43 105c-2-31 10-58 39-82"
  ];

  return tileShell(`
    <rect x="10" y="9" width="108" height="108" rx="18" fill="${p.body}"/>
    <rect x="15" y="15" width="98" height="98" rx="15" fill="none" stroke="${p.bodyDark}" stroke-width="4" opacity=".58"/>
    <circle cx="64" cy="63" r="40" fill="${p.body}" stroke="${p.bodyDark}" stroke-width="5"/>
    ${strands.map((d, index) => `<path d="${d}" fill="none" stroke="${index % 2 ? p.bodyDark : p.bodyLight}" stroke-width="${index % 2 ? 6 : 5}" stroke-linecap="round" opacity="${index % 2 ? ".65" : ".72"}"/>`).join("")}
    <path d="M83 92c15 5 24 0 27-10" fill="none" stroke="${p.bodyDark}" stroke-width="7" stroke-linecap="round"/>
    <path d="M82 92c14 2 21-1 25-8" fill="none" stroke="${p.bodyLight}" stroke-width="3" stroke-linecap="round" opacity=".7"/>
    <circle cx="48" cy="39" r="5" fill="#fff" opacity=".22"/>
  `, { shadow: p.bodyDark });
}

await mkdir(outDir, { recursive: true });

for (const [name, palette] of Object.entries(catPalettes)) {
  await writeFile(new URL(`${name}.svg`, outDir), catSvg(name, palette));
}

for (const [name, palette] of Object.entries(yarnPalettes)) {
  await writeFile(new URL(`${name}.svg`, outDir), yarnSvg(name, palette));
}
