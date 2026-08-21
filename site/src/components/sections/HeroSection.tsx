import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, BrainElectricity, DatabaseStats, NetworkRight } from "iconoir-react";
import { archiveItems, featuredItems } from "../../data/portfolio";
import { mailTo, publicProfile } from "../../data/site";
import { useMotionEnabled, useMountStagger } from "../../motion";
import { IconSocket } from "../IconSocket";
import type { CaseSelectHandler } from "./types";

const featuredIcons = [NetworkRight, DatabaseStats, BrainElectricity];
const featuredFlows = [
  "Hook → e-mail → planilha",
  "Banco → arquivo → insight",
  "Memória → habilidade → ação",
];

type HeroSectionProps = {
  onSelectItem: CaseSelectHandler;
  introReady: boolean;
};

export function HeroSection({ onSelectItem, introReady }: HeroSectionProps) {
  const mountAll = useMountStagger();
  const mount = introReady ? mountAll : () => ({});
  const motionEnabled = useMotionEnabled();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 28]);
  const showcaseY = useTransform(scrollYProgress, [0, 1], [0, -44]);

  return (
    <section className="hero" id="top" aria-labelledby="hero-title" ref={heroRef}>
      <motion.div className="hero-copy" style={motionEnabled ? { y: copyY } : undefined}>
        <motion.p className="eyebrow" {...mount(0)}>
          <span className="eyebrow__name">{publicProfile.name}</span>
          <span className="eyebrow__meta">Software, automação, dados e IA</span>
        </motion.p>
        <div className="hero-title-block">
          <motion.h1 id="hero-title" className="hero-title__lead" {...mount(1)}>
            Ideias ganham forma.
          </motion.h1>
          <motion.p className="hero-title__reveal" {...mount(2)}>
            Processos viram produto.
          </motion.p>
        </div>
        <motion.p className="hero-summary" {...mount(3)}>
          Faço sistema a partir de processo real. São {archiveItems.length} projetos. Sem
          métrica inventada.
        </motion.p>
        <motion.div className="hero-actions" {...mount(4)}>
          <a className="button button--dark" href={mailTo()}>
            Conversar
            <ArrowUpRight width={19} height={19} strokeWidth={1.8} aria-hidden />
          </a>
          <a className="button button--ghost" href="#projetos">
            Conhecer projetos
            <ArrowUpRight width={19} height={19} strokeWidth={1.8} aria-hidden />
          </a>
        </motion.div>
      </motion.div>

      <motion.div className="hero-showcase" style={motionEnabled ? { y: showcaseY } : undefined}>
        <img className="dot-field dot-field--hero" src="/assets/mm-dot-field.svg" alt="" aria-hidden />
        {featuredItems.map((item, index) => {
          const Icon = featuredIcons[index] ?? NetworkRight;

          return (
            <motion.div className="hero-project-shell" key={item.id} {...mount(index + 5)}>
              <motion.button
                className={`hero-project hero-project--${index + 1} modal-card-trigger`}
                type="button"
                onClick={() => onSelectItem(item, { morph: false })}
                aria-label={`Abrir destaque: ${item.editorialTitle ?? item.title}`}
              >
                <IconSocket icon={Icon} accent="cobalt" size="large" />
                <span className="hero-project__copy">
                  {item.status === "lab" ? <small>LAB · EM CONSTRUÇÃO</small> : null}
                  <strong>{item.editorialTitle ?? item.title}</strong>
                  <span>{featuredFlows[index]}</span>
                </span>
                <ArrowRight className="hero-project__arrow" width={32} height={32} strokeWidth={1.7} aria-hidden />
              </motion.button>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
