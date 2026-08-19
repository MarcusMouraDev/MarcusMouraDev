import { motion } from "motion/react";
import { ArrowRight, ArrowUpRight, BrainElectricity, DatabaseStats, NetworkRight } from "iconoir-react";
import { archiveItems, featuredItems } from "../../data/portfolio";
import { mailTo } from "../../data/site";
import { IconSocket } from "../IconSocket";
import type { CaseSelectHandler, RevealProps } from "./types";

const featuredIcons = [NetworkRight, DatabaseStats, BrainElectricity];
const featuredFlows = [
  "Hook → e-mail → planilha",
  "Banco → arquivo → insight",
  "Memória → habilidade → ação",
];

type HeroSectionProps = {
  reveal: RevealProps;
  onSelectItem: CaseSelectHandler;
};

export function HeroSection({ reveal, onSelectItem }: HeroSectionProps) {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <motion.div className="hero-copy" {...reveal}>
        <p className="eyebrow">
          Marcus Moura <span /> Software, automação, dados e IA
        </p>
        <h1 id="hero-title">
          Ideias ganham forma. <span>Processos viram produto.</span>
        </h1>
        <p className="hero-summary">
          Transformo processos reais em sistemas úteis, claros e confiáveis. Arquivo com{" "}
          {archiveItems.length} projetos, sem números inventados.
        </p>
        <div className="hero-actions">
          <a className="button button--dark" href={mailTo()}>
            Conversar
            <ArrowUpRight width={19} height={19} strokeWidth={1.8} aria-hidden />
          </a>
          <a className="button button--ghost" href="#projetos">
            Conhecer projetos
            <ArrowUpRight width={19} height={19} strokeWidth={1.8} aria-hidden />
          </a>
        </div>
      </motion.div>

      <motion.div className="hero-showcase" {...reveal}>
        <img className="dot-field dot-field--hero" src="/assets/mm-dot-field.png" alt="" aria-hidden />
        {featuredItems.map((item, index) => {
          const Icon = featuredIcons[index] ?? NetworkRight;
          return (
            <button
              className={`hero-project hero-project--${index + 1}`}
              type="button"
              key={item.id}
              onClick={() => onSelectItem(item)}
              aria-label={`Abrir destaque: ${item.editorialTitle ?? item.title}`}
            >
              <IconSocket icon={Icon} accent="cobalt" size="large" />
              <span className="hero-project__copy">
                {item.status === "lab" ? <small>LAB · EM CONSTRUÇÃO</small> : null}
                <strong>{item.editorialTitle ?? item.title}</strong>
                <span>{featuredFlows[index]}</span>
              </span>
              <ArrowRight className="hero-project__arrow" width={32} height={32} strokeWidth={1.7} aria-hidden />
            </button>
          );
        })}
      </motion.div>
    </section>
  );
}
