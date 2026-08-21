import type { ModalCardData } from "../components/ui/modal-cards-tw";
import type { PortfolioCategory, PortfolioItem } from "./portfolio";

const categoryGradients: Record<PortfolioCategory, string> = {
  Automação: "#0b46ef",
  Dados: "#0b46ef",
  Web: "#0e1112",
  Python: "#0b46ef",
  Mobile: "#12b5a8",
  IA: "#ff5a43",
};

export function portfolioAccent(item: PortfolioItem): string {
  return item.status === "lab" ? "#ff5a43" : categoryGradients[item.category];
}

export function portfolioToModalCard(item: PortfolioItem): ModalCardData {
  return {
    id: item.id,
    title: item.editorialTitle ?? item.title,
    description: item.summary,
    gradientColor: portfolioAccent(item),
  };
}
