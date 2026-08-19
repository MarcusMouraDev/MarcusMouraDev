import { motion } from "motion/react";
import { ArrowUpRight } from "iconoir-react";
import { featuredItems, type PortfolioItem } from "../../data/portfolio";
import { AiVisual, AutomationVisual, DataVisual } from "../FeaturedVisual";
import type { CaseSelectHandler, RevealProps } from "./types";

type FeaturedCasesSectionProps = {
  reveal: RevealProps;
  onSelectItem: CaseSelectHandler;
};

export function FeaturedCasesSection({ reveal, onSelectItem }: FeaturedCasesSectionProps) {
  const [automation, data, lab] = featuredItems;

  if (!automation || !data || !lab) return null;

  return (
    <section className="featured-cases" id="projetos" aria-label="Frentes em destaque">
      <motion.article className="case-study" {...reveal}>
        <CaseIntro number="01" item={automation} onOpen={() => onSelectItem(automation)} />
        <AutomationVisual />
      </motion.article>

      <motion.article className="case-study" {...reveal}>
        <CaseIntro number="02" item={data} onOpen={() => onSelectItem(data)} />
        <DataVisual />
      </motion.article>

      <motion.article className="case-study case-study--lab" {...reveal}>
        <CaseIntro number="03" item={lab} onOpen={() => onSelectItem(lab)} lab />
        <AiVisual />
      </motion.article>
    </section>
  );
}

type CaseIntroProps = {
  number: string;
  item: PortfolioItem;
  onOpen: () => void;
  lab?: boolean;
};

function CaseIntro({ number, item, onOpen, lab = false }: CaseIntroProps) {
  return (
    <div className="case-intro">
      <div className="case-number">
        {number}
        <span aria-hidden="true" />
      </div>
      {lab ? <span className="lab-badge">LAB · EM CONSTRUÇÃO</span> : null}
      <h2>{item.editorialTitle ?? item.title}</h2>
      <span className="case-rule" aria-hidden="true" />
      <p>{item.summary}</p>
      <button className="button button--ghost" type="button" onClick={onOpen}>
        {lab ? "Ver arquitetura" : "Ver detalhes do case"}
        <ArrowUpRight width={19} height={19} strokeWidth={1.8} aria-hidden />
      </button>
    </div>
  );
}

