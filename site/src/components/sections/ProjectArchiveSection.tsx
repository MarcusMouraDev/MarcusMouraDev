import { motion } from "motion/react";
import {
  ArrowUpRight,
  BrainElectricity,
  CodeBrackets,
  Database,
  NetworkRight,
  SmartphoneDevice,
  Terminal,
} from "iconoir-react";
import {
  archiveCategories,
  archiveItems,
  type PortfolioCategory,
  type PortfolioItem,
} from "../../data/portfolio";
import { IconSocket } from "../IconSocket";
import type { CaseSelectHandler, RevealProps } from "./types";

const categoryIcons = {
  Automação: NetworkRight,
  Dados: Database,
  Web: CodeBrackets,
  Python: Terminal,
  Mobile: SmartphoneDevice,
  IA: BrainElectricity,
};

type ProjectArchiveSectionProps = {
  reveal: RevealProps;
  activeCategory: "Todos" | PortfolioCategory;
  onCategoryChange: (category: "Todos" | PortfolioCategory) => void;
  visibleProjects: PortfolioItem[];
  onSelectItem: CaseSelectHandler;
};

export function ProjectArchiveSection({
  reveal,
  activeCategory,
  onCategoryChange,
  visibleProjects,
  onSelectItem,
}: ProjectArchiveSectionProps) {
  return (
    <motion.section className="project-archive section-shell" aria-label="Arquivo de projetos" {...reveal}>
      <div className="section-heading">
        <div>
          <h2 id="archive-title">
            {archiveItems.length} projetos. <span>Sem números inventados.</span>
          </h2>
        </div>
        <p>
          <span>Públicos e privados selecionados</span>
        </p>
      </div>

      <div className="archive-filters" role="toolbar" aria-label="Filtrar projetos">
        {archiveCategories.map((category) => (
          <button
            type="button"
            key={category}
            aria-pressed={activeCategory === category}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="archive-list" aria-live="polite">
        {visibleProjects.length === 0 ? (
          <p className="archive-empty">Nenhum projeto nesta frente. Volte para Todos para ver o arquivo completo.</p>
        ) : (
          visibleProjects.map((item) => {
            const Icon = categoryIcons[item.category];
            return (
              <article className="archive-row" key={item.id}>
                <span className="archive-row__number">
                  {String(archiveItems.indexOf(item) + 1).padStart(2, "0")}
                </span>
                <IconSocket icon={Icon} accent={item.category === "Mobile" ? "aqua" : "cobalt"} />
                <div className="archive-row__title">
                  <span>{item.category}</span>
                  <h3>{item.editorialTitle ?? item.title}</h3>
                  {item.editorialTitle ? <small>{item.title}</small> : null}
                </div>
                <p>{item.outcome}</p>
                <ul className="archive-row__tags" aria-label={`Tecnologias de ${item.title}`}>
                  {item.technologies.slice(0, 3).map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>
                <button
                  className="archive-row__action"
                  type="button"
                  onClick={() => onSelectItem(item)}
                  aria-label={`Ver detalhes: ${item.editorialTitle ?? item.title}`}
                >
                  <span>Detalhes</span>
                  <ArrowUpRight width={20} height={20} strokeWidth={1.8} aria-hidden />
                </button>
              </article>
            );
          })
        )}
      </div>
    </motion.section>
  );
}
