import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowUpRight,
  BrainElectricity,
  CodeBrackets,
  Database,
  NetworkRight,
  SmartphoneDevice,
  Terminal,
} from "iconoir-react";
import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  archiveCategories,
  archiveItems,
  type PortfolioCategory,
  type PortfolioItem,
} from "../../data/portfolio";
import { portfolioAccent } from "../../data/portfolioModalCards";
import { archiveRowMotion, useMotionEnabled } from "../../motion";
import { IconSocket } from "../IconSocket";
import { TechHoverList } from "../TechHoverList";
import { modalCardLayoutId } from "../ui/modal-cards-tw";
import type { CaseSelectHandler } from "./types";

const categoryIcons = {
  Automação: NetworkRight,
  Dados: Database,
  Web: CodeBrackets,
  Python: Terminal,
  Mobile: SmartphoneDevice,
  IA: BrainElectricity,
};

type ProjectArchiveSectionProps = {
  activeCategory: "Todos" | PortfolioCategory;
  onCategoryChange: (category: "Todos" | PortfolioCategory) => void;
  visibleProjects: PortfolioItem[];
  onSelectItem: CaseSelectHandler;
  selectedId?: string | null;
};

function useFilterPill(activeCategory: "Todos" | PortfolioCategory) {
  const toolbarRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const didMount = useRef(false);
  const reduceMotion = useReducedMotion();

  const syncPill = useCallback(
    (animate: boolean) => {
      const toolbar = toolbarRef.current;
      const pill = pillRef.current;
      const active = toolbar?.querySelector<HTMLElement>('[aria-pressed="true"]');
      if (!toolbar || !pill || !active) return;

      const shouldAnimate = animate && !reduceMotion;
      if (!shouldAnimate) {
        pill.style.transition = "none";
      }

      pill.style.width = `${active.offsetWidth}px`;
      pill.style.height = `${active.offsetHeight}px`;
      pill.style.transform = `translate(${active.offsetLeft}px, ${active.offsetTop}px)`;

      if (!shouldAnimate) {
        pill.getBoundingClientRect();
        pill.style.transition = "";
      }
    },
    [reduceMotion],
  );

  useLayoutEffect(() => {
    syncPill(didMount.current);
    didMount.current = true;
  }, [activeCategory, syncPill]);

  useEffect(() => {
    const toolbar = toolbarRef.current;
    if (!toolbar || typeof ResizeObserver === "undefined") return undefined;
    const observer = new ResizeObserver(() => syncPill(false));
    observer.observe(toolbar);
    return () => observer.disconnect();
  }, [syncPill]);

  return { toolbarRef, pillRef };
}

export function ProjectArchiveSection({
  activeCategory,
  onCategoryChange,
  visibleProjects,
  onSelectItem,
  selectedId = null,
}: ProjectArchiveSectionProps) {
  const { toolbarRef, pillRef } = useFilterPill(activeCategory);
  const motionEnabled = useMotionEnabled();

  return (
    <section className="project-archive section-shell" aria-label="Arquivo de projetos">
      <div className="section-heading">
        <div>
          <h2 id="archive-title">
            {archiveItems.length} projetos. <span>Sem métrica inventada.</span>
          </h2>
        </div>
        <p>
          <span>Públicos e privados selecionados</span>
        </p>
      </div>

      <div className="archive-filters" role="toolbar" aria-label="Filtrar projetos" ref={toolbarRef}>
        <span className="archive-filters__pill" ref={pillRef} aria-hidden="true" />
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

      <div className="archive-grid" aria-live="polite">
        <AnimatePresence mode="sync">
          {visibleProjects.length === 0 ? (
            <motion.p
              className="archive-empty"
              key="empty"
              initial={motionEnabled ? { opacity: 0 } : false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: motionEnabled ? 0.15 : 0 } }}
              transition={{ duration: 0.15 }}
            >
              Nenhum projeto nessa frente. Volta em Todos para ver o arquivo.
            </motion.p>
          ) : (
            visibleProjects.map((item, index) => {
              const Icon = categoryIcons[item.category];
              const title = item.editorialTitle ?? item.title;
              const isOpen = selectedId === item.id;

              if (isOpen) {
                return (
                  <div
                    className="archive-card archive-card--placeholder"
                    key={item.id}
                    aria-hidden="true"
                  />
                );
              }

              return (
                <motion.article
                  className="archive-card modal-card-trigger"
                  key={item.id}
                  layoutId={modalCardLayoutId(item.id, "shell")}
                  style={{ ["--archive-card-accent" as string]: portfolioAccent(item) }}
                  {...archiveRowMotion(index, motionEnabled)}
                  onClick={(event) => {
                    const target = event.target as HTMLElement;
                    if (target.closest("button, a, .hover-preview-tw__target")) return;
                    onSelectItem(item, { morph: true });
                  }}
                >
                  <div className="archive-card__meta">
                    <span className="archive-card__number">
                      {String(archiveItems.indexOf(item) + 1).padStart(2, "0")}
                    </span>
                    <IconSocket icon={Icon} accent={item.category === "Mobile" ? "aqua" : "cobalt"} />
                  </div>
                  <span className="archive-card__category">{item.category}</span>
                  <motion.h3 layoutId={modalCardLayoutId(item.id, "title")}>{title}</motion.h3>
                  {item.editorialTitle ? <small>{item.title}</small> : null}
                  <p>{item.outcome}</p>
                  <TechHoverList
                    labels={item.technologies.slice(0, 3)}
                    className="archive-card__tags"
                    label={`Tecnologias de ${item.title}`}
                    imagePosition="above"
                  />
                  <button
                    className="archive-card__action"
                    type="button"
                    onClick={() => onSelectItem(item, { morph: true })}
                    aria-label={`Ver detalhes: ${title}`}
                  >
                    <span>Detalhes</span>
                    <ArrowUpRight width={20} height={20} strokeWidth={1.8} aria-hidden />
                  </button>
                </motion.article>
              );
            })
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
