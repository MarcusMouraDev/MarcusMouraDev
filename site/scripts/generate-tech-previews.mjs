import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public/assets/tech");
mkdirSync(outDir, { recursive: true });

const UA =
  "MarcusMouraDev-portfolio/1.0 (tech preview marks; +https://github.com/simple-icons/simple-icons)";

const files = {
  python: [
    "Python",
    {
      type: "remote",
      url: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    },
  ],
  sql: ["SQL", { type: "simple", slug: "mysql", hex: "4479A1" }],
  sqlite: ["SQLite", { type: "simple", slug: "sqlite", hex: "003B57" }],
  sqlalchemy: ["SQLAlchemy", { type: "simple", slug: "sqlalchemy", hex: "D71F00" }],
  javascript: ["JavaScript", { type: "simple", slug: "javascript", hex: "F7DF1E", evenodd: true }],
  react: ["React", { type: "simple", slug: "react", hex: "61DAFB" }],
  css: ["CSS", { type: "simple", slug: "css", hex: "663399", evenodd: true }],
  html: ["HTML", { type: "simple", slug: "html5", hex: "E34F26", evenodd: true }],
  git: ["Git", { type: "simple", slug: "git", hex: "F05032" }],
  swiftui: ["SwiftUI", { type: "simple", slug: "swift", hex: "F05138" }],
  ios: ["iOS", { type: "simple", slug: "ios", hex: "000000" }],
  pandas: ["Pandas", { type: "simple", slug: "pandas", hex: "150458" }],
  n8n: ["n8n", { type: "simple", slug: "n8n", hex: "EA4B71" }],
  ollama: ["Ollama", { type: "simple", slug: "ollama", hex: "000000" }],
  "apis-rest": ["APIs REST", { type: "simple", slug: "swagger", hex: "85EA2D" }],
  apis: ["APIs", { type: "simple", slug: "postman", hex: "FF6C37" }],
  "rest-api": ["REST API", { type: "simple", slug: "openapiinitiative", hex: "6BA539" }],
  "banco-de-dados": ["Banco de dados", { type: "simple", slug: "postgresql", hex: "4169E1" }],
  "e-mail-automatico": ["E-mail", { type: "simple", slug: "gmail", hex: "EA4335" }],
  planilhas: ["Planilhas", { type: "simple", slug: "googlesheets", hex: "34A853" }],
  automacao: ["Automação", { type: "simple", slug: "zapier", hex: "FF4F00" }],
  trino: ["Trino", { type: "simple", slug: "trino", hex: "DD00A1" }],
  tableau: [
    "Tableau",
    {
      type: "remote",
      url: "https://cdn.jsdelivr.net/gh/gilbarbara/logos@main/logos/tableau-icon.svg",
    },
  ],
  sharepoint: [
    "SharePoint",
    {
      type: "remote",
      url: "https://res.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/brand-icons/product/svg/sharepoint_48x1.svg",
    },
  ],
  agendamento: ["Agendamento", { type: "simple", slug: "googlecalendar", hex: "4285F4" }],
  indexeddb: ["IndexedDB", { type: "material", icon: "database", hex: "E34F26" }],
  pwa: ["PWA", { type: "simple", slug: "pwa", hex: "5A0FC8" }],
  openweather: ["OpenWeather", { type: "openweather" }],
  poo: ["POO", { type: "simple", slug: "uml", hex: "FABD14" }],
  "game-logic": ["Game Logic", { type: "material", icon: "sports_esports", hex: "101214" }],
  whatsapp: ["WhatsApp", { type: "simple", slug: "whatsapp", hex: "25D366" }],
  cli: ["CLI", { type: "simple", slug: "gnubash", hex: "4EAA25" }],
  ux: ["UX", { type: "simple", slug: "figma", hex: "F24E1E" }],
  agentes: ["Agentes", { type: "simple", slug: "langchain", hex: "1C3C3C" }],
  default: ["Stack", { type: "simple", slug: "gnometerminal", hex: "101214" }],
};

function parseViewBox(svg) {
  const match = svg.match(/viewBox=["']([^"']+)["']/i);
  if (!match) {
    const width = Number(svg.match(/\bwidth=["']([\d.]+)/i)?.[1] ?? 24);
    const height = Number(svg.match(/\bheight=["']([\d.]+)/i)?.[1] ?? 24);
    return [0, 0, width, height];
  }
  const parts = match[1].trim().split(/[\s,]+/).map(Number);
  return parts.length === 4 ? parts : [0, 0, 24, 24];
}

function innerMarkup(svg) {
  return svg
    .replace(/<\?xml[^>]*>/i, "")
    .replace(/<!DOCTYPE[^>]*>/i, "")
    .replace(/^[\s\S]*?<svg[^>]*>/i, "")
    .replace(/<\/svg>[\s\S]*$/i, "")
    .replace(/<title>[\s\S]*?<\/title>/gi, "")
    .trim();
}

function prefixIds(markup, prefix) {
  const ids = [...markup.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
  let next = markup;
  for (const id of ids) {
    const safe = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    next = next
      .replace(new RegExp(`id=["']${safe}["']`, "g"), `id="${prefix}-${id}"`)
      .replace(new RegExp(`url\\(#${safe}\\)`, "g"), `url(#${prefix}-${id})`)
      .replace(new RegExp(`href=["']#${safe}["']`, "g"), `href="#${prefix}-${id}"`);
  }
  return next;
}

function markSvg(label, inner, viewBox, fill, evenodd = false) {
  const [minX, minY, width, height] = viewBox;
  const fillAttr = fill ? ` fill="#${String(fill).replace("#", "")}"` : "";
  const ruleAttr = evenodd ? ` fill-rule="evenodd"` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${minX} ${minY} ${width} ${height}" role="img" aria-label="${label}"${fillAttr}${ruleAttr}>
  ${inner}
</svg>
`;
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "User-Agent": UA } });
  if (!response.ok) {
    throw new Error(`${response.status} ${url}`);
  }
  return response.text();
}

async function simpleIcon(slug) {
  return fetchText(`https://cdn.jsdelivr.net/npm/simple-icons@15/icons/${slug}.svg`);
}

async function materialIcon(name) {
  return fetchText(
    `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsrounded/${name}/fill1/48px.svg`,
  );
}

function openWeatherMark() {
  return `<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-label="OpenWeather">
  <g fill="#EB6E4B">
    <circle cx="32" cy="32" r="12"/>
    <rect x="30" y="4" width="4" height="12" rx="2"/>
    <rect x="30" y="48" width="4" height="12" rx="2"/>
    <rect x="4" y="30" width="12" height="4" rx="2"/>
    <rect x="48" y="30" width="12" height="4" rx="2"/>
    <g transform="rotate(45 32 32)">
      <rect x="30" y="4" width="4" height="12" rx="2"/>
      <rect x="30" y="48" width="4" height="12" rx="2"/>
      <rect x="4" y="30" width="12" height="4" rx="2"/>
      <rect x="48" y="30" width="12" height="4" rx="2"/>
    </g>
  </g>
</svg>`;
}

async function buildMark(fileSlug, label, source) {
  if (source.type === "simple") {
    const svg = await simpleIcon(source.slug);
    return markSvg(label, innerMarkup(svg), parseViewBox(svg), source.hex, source.evenodd);
  }

  if (source.type === "material") {
    const svg = await materialIcon(source.icon);
    const inner = innerMarkup(svg).replace(/fill="[^"]*"/g, "");
    return markSvg(label, inner, parseViewBox(svg), source.hex);
  }

  if (source.type === "remote") {
    const svg = await fetchText(source.url);
    return markSvg(label, prefixIds(innerMarkup(svg), fileSlug), parseViewBox(svg));
  }

  if (source.type === "openweather") {
    const svg = openWeatherMark();
    return markSvg(label, innerMarkup(svg), parseViewBox(svg));
  }

  throw new Error(`Unknown source for ${fileSlug}`);
}

const entries = Object.entries(files);
for (const [slug, [label, source]] of entries) {
  const svg = await buildMark(slug, label, source);
  writeFileSync(join(outDir, `${slug}.svg`), svg);
  console.log(`wrote ${slug}.svg`);
}

console.log(`Wrote ${entries.length} real tech marks to public/assets/tech`);
