import { motion } from "motion/react";
import type { RevealProps } from "./types";

type AboutSectionProps = {
  reveal: RevealProps;
};

export function AboutSection({ reveal }: AboutSectionProps) {
  return (
    <motion.section className="about section-shell" id="sobre" aria-labelledby="about-title" {...reveal}>
      <div className="about-copy">
        <h2 id="about-title">
          Curiosidade técnica. <span>Entrega prática.</span>
        </h2>
        <p className="about-lead">
          Sou Marcus Moura, estudante de Engenharia de Software na UNA e desenvolvedor de sistemas,
          automações e experiências digitais.
        </p>
        <p>
          Minha experiência com rotinas administrativas, atendimento e documentação me ensinou a
          entender o processo antes de codificar: observo o problema, organizo as regras e construo
          uma solução clara para quem vai utilizá-la.
        </p>
      </div>
      <dl className="fact-grid">
        <div>
          <dt>Localização</dt>
          <dd>Belo Horizonte · Brasil</dd>
        </div>
        <div>
          <dt>Formação</dt>
          <dd>Engenharia de Software · UNA</dd>
        </div>
        <div>
          <dt>Foco</dt>
          <dd>Python · APIs REST · SQL · automação</dd>
        </div>
        <div>
          <dt>Explorando</dt>
          <dd>IA local · agentes · produtos úteis</dd>
        </div>
        <div>
          <dt>Idiomas</dt>
          <dd>Português nativo · inglês intermediário</dd>
        </div>
        <div>
          <dt>Disponível</dt>
          <dd>Oportunidades · projetos · colaborações</dd>
        </div>
      </dl>
      <div className="technology-strip" aria-label="Tecnologias e ferramentas">
        {[
          "Python",
          "APIs REST",
          "SQL",
          "SQLite",
          "SQLAlchemy",
          "Pandas",
          "n8n",
          "Ollama",
          "JavaScript",
          "SwiftUI",
          "Git",
        ].map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
    </motion.section>
  );
}
