import {
  ArrowUpRight,
  CheckCircle,
  NavArrowRight,
} from "iconoir-react";
import { motion, useReducedMotion } from "motion/react";
import type { PortfolioItem } from "../data/portfolio";
import { TechHoverList } from "./TechHoverList";
import { modalCardLayoutId } from "./ui/modal-cards-tw";

type CaseDetailPanelProps = {
  item: PortfolioItem;
  onClose: () => void;
  morphTitle?: boolean;
};

export function CaseDetailPanel({ item, onClose, morphTitle = true }: CaseDetailPanelProps) {
  const reduceMotion = useReducedMotion();
  const useLayoutMorph = morphTitle && !reduceMotion;
  const actionLabel =
    item.status === "public"
      ? "Ver código no GitHub"
      : item.status === "lab"
        ? "Conversar sobre o laboratório"
        : "Pedir uma demonstração";

  const title = item.editorialTitle ?? item.title;

  return (
    <>
      <div className="case-dialog__topline">
        <span className="eyebrow">
          {item.status === "lab" ? "LAB · EM CONSTRUÇÃO" : item.category}
        </span>
      </div>

      {useLayoutMorph ? (
        <motion.h2
          layoutId={modalCardLayoutId(item.id, "title")}
          className="case-dialog__title"
          id={`modal-title-${item.id}`}
        >
          {title}
        </motion.h2>
      ) : (
        <h2 className="case-dialog__title" id={`modal-title-${item.id}`}>
          {title}
        </h2>
      )}

      {useLayoutMorph ? (
        <motion.p
          layoutId={modalCardLayoutId(item.id, "desc")}
          className="case-dialog__description"
        >
          {item.summary}
        </motion.p>
      ) : (
        <p className="case-dialog__description">{item.summary}</p>
      )}

      {item.editorialTitle ? (
        <p className="case-dialog__original-title">Projeto: {item.title}</p>
      ) : null}

      <div className="case-dialog__grid">
        <section>
          <p className="case-dialog__label">Problema</p>
          <p>{item.problem}</p>
        </section>
        <section>
          <p className="case-dialog__label">Minha contribuição</p>
          <p>{item.contribution}</p>
        </section>
        <section className="case-dialog__outcome">
          <p className="case-dialog__label">Resultado</p>
          <p>
            <CheckCircle width={20} height={20} strokeWidth={1.8} aria-hidden />
            {item.outcome}
          </p>
        </section>
      </div>

      <div className="case-dialog__flow" aria-label="Fluxo simplificado">
        {item.flow.map((step, index) => (
          <div className="dialog-flow-step" key={step}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step}</strong>
            {index < item.flow.length - 1 ? (
              <NavArrowRight width={18} height={18} strokeWidth={1.7} aria-hidden />
            ) : null}
          </div>
        ))}
      </div>

      <TechHoverList
        labels={item.technologies}
        className="tag-list"
        label="Tecnologias"
        imagePosition="above"
      />

      <div className="case-dialog__actions">
        <a className="button button--dark" href={item.href}>
          {actionLabel}
          <ArrowUpRight width={19} height={19} strokeWidth={1.8} aria-hidden />
        </a>
        <button className="button button--ghost" type="button" onClick={onClose}>
          Voltar ao portfólio
        </button>
      </div>
    </>
  );
}
