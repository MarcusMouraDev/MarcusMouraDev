import { motion } from "motion/react";
import { ArrowUpRight } from "iconoir-react";
import { featuredItems, type PortfolioItem } from "../../data/portfolio";
import { FLOW_EASE, useMotionEnabled, useStagger } from "../../motion";
import { AiVisual, AutomationVisual, DataVisual } from "../FeaturedVisual";
import type { CaseSelectHandler } from "./types";

type FeaturedCasesSectionProps = {
  onSelectItem: CaseSelectHandler;
};

export function FeaturedCasesSection({ onSelectItem }: FeaturedCasesSectionProps) {
  const [automation, data, lab] = featuredItems;
  const reveal = useStagger();

  if (!automation || !data || !lab) return null;

  return (
    <section className="featured-cases" id="projetos" aria-label="Frentes em destaque">
      <motion.article className="case-study" {...reveal(0, 0, 20)}>
        <CaseIntro
          number="01"
          item={automation}
          onOpen={() => onSelectItem(automation, { morph: false })}
        />
        <AutomationVisual />
      </motion.article>

      <motion.article className="case-study" {...reveal(1, 0, 20)}>
        <CaseIntro
          number="02"
          item={data}
          onOpen={() => onSelectItem(data, { morph: false })}
        />
        <DataVisual />
      </motion.article>

      <motion.article className="case-study case-study--lab" {...reveal(2, 0, 20)}>
        <CaseIntro
          number="03"
          item={lab}
          onOpen={() => onSelectItem(lab, { morph: false })}
          lab
        />
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
  const stagger = useStagger();
  const motionEnabled = useMotionEnabled();

  return (
    <motion.div className="case-intro">
      <motion.div className="case-number" {...stagger(0)}>
        {number}
        <span aria-hidden="true" />
      </motion.div>
      {lab ? (
        <motion.span className="lab-badge" {...stagger(1)}>
          LAB · EM CONSTRUÇÃO
        </motion.span>
      ) : null}
      <motion.h2 {...stagger(lab ? 2 : 1)}>
        {item.editorialTitle ?? item.title}
      </motion.h2>
      <motion.span
        className="case-rule"
        aria-hidden="true"
        initial={motionEnabled ? { opacity: 0, transform: "scaleX(0.35)" } : false}
        whileInView={{ opacity: 1, transform: "scaleX(1)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.32, delay: lab ? 0.12 : 0.08, ease: FLOW_EASE }}
      />
      <motion.p {...stagger(lab ? 4 : 3)}>
        {item.summary}
      </motion.p>
      <motion.button className="button button--ghost" type="button" onClick={onOpen} {...stagger(lab ? 5 : 4)}>
        {lab ? "Ver a arquitetura" : "Ver detalhes"}
        <ArrowUpRight width={19} height={19} strokeWidth={1.8} aria-hidden />
      </motion.button>
    </motion.div>
  );
}
