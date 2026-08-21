import type { HoverTarget } from "../components/ui/hover-preview-tw";

const slugByLabel: Record<string, string> = {
  Python: "python",
  SQL: "sql",
  SQLite: "sqlite",
  SQLAlchemy: "sqlalchemy",
  JavaScript: "javascript",
  React: "react",
  CSS: "css",
  HTML: "html",
  Git: "git",
  SwiftUI: "swiftui",
  iOS: "ios",
  Pandas: "pandas",
  n8n: "n8n",
  Ollama: "ollama",
  "APIs REST": "apis-rest",
  APIs: "apis",
  "REST API": "rest-api",
  "Banco de dados": "banco-de-dados",
  "E-mail automático": "e-mail-automatico",
  Planilhas: "planilhas",
  Automação: "automacao",
  Trino: "trino",
  Tableau: "tableau",
  SharePoint: "sharepoint",
  Agendamento: "agendamento",
  IndexedDB: "indexeddb",
  PWA: "pwa",
  OpenWeather: "openweather",
  POO: "poo",
  "Game Logic": "game-logic",
  WhatsApp: "whatsapp",
  CLI: "cli",
  UX: "ux",
  Agentes: "agentes",
};

export function techPreviewUrl(label: string) {
  const slug = slugByLabel[label] ?? "default";
  return `/assets/tech/${slug}.svg`;
}

export function techHoverTarget(label: string): HoverTarget {
  return {
    text: label,
    imageUrl: techPreviewUrl(label),
    altText: `Prévia de ${label}`,
  };
}

export function techHoverTargets(labels: string[]): HoverTarget[] {
  return labels.map(techHoverTarget);
}

export function techInlineContent(labels: string[]): string {
  if (labels.length === 0) return "";
  if (labels.length === 1) return "{0}";
  const head = labels.slice(0, -1).map((_, index) => `{${index}}`);
  return `${head.join(", ")} e {${labels.length - 1}}`;
}
