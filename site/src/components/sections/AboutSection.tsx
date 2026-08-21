import { motion } from "motion/react";
import { HoverPreviewTw } from "../ui/hover-preview-tw";
import { techHoverTargets } from "../../data/techPreviews";
import { useStagger } from "../../motion";
import type { RevealProps } from "./types";

const facts = [
  { term: "Localização", detail: "Belo Horizonte · Brasil" },
  { term: "Formação", detail: "Engenharia de Software · UNA" },
  { term: "Foco", detail: "Python · APIs REST · SQL · automação" },
  { term: "Explorando", detail: "IA local · agentes · produtos úteis" },
  { term: "Idiomas", detail: "Português nativo · inglês intermediário" },
  { term: "Disponível", detail: "Oportunidades · projetos · colaborações" },
];

type AboutSectionProps = {
  reveal: RevealProps;
};

export function AboutSection({ reveal }: AboutSectionProps) {
  const stagger = useStagger();

  return (
    <motion.section className="about section-shell" id="sobre" aria-labelledby="about-title" {...reveal}>
      <div className="about-copy">
        <h2 id="about-title">
          Curiosidade técnica. <span>Entrega prática.</span>
        </h2>
        <p className="about-lead">
          Sou Marcus Moura. Estudo Engenharia de Software na UNA e faço sistemas, automações e
          experiências digitais.
        </p>
        <p>
          Passei por rotina administrativa, atendimento e documentação. Isso me fez olhar o
          processo antes de escrever código. Vejo o problema, organizo as regras e monto algo que
          dá para usar.
        </p>
        <HoverPreviewTw
          className="about-tech-copy"
          content="Uso principalmente {0}, {1} e {2}. No front, {3} e {4}. Em dados, {5}, {6} e {7}. Automação com {8} e {9}. No celular, {10}. Versiono com {11}."
          targets={techHoverTargets([
            "Python",
            "APIs REST",
            "SQL",
            "React",
            "JavaScript",
            "SQLite",
            "SQLAlchemy",
            "Pandas",
            "n8n",
            "Ollama",
            "SwiftUI",
            "Git",
          ])}
          imagePosition="above"
        />
      </div>
      <dl className="fact-grid">
        {facts.map((fact, index) => (
          <motion.div key={fact.term} {...stagger(index)}>
            <dt>{fact.term}</dt>
            <dd>
              {fact.term === "Foco" ? (
                <HoverPreviewTw
                  className="fact-tech-preview"
                  content="{0} · {1} · {2} · automação"
                  targets={techHoverTargets(["Python", "APIs REST", "SQL"])}
                  imagePosition="below"
                />
              ) : (
                fact.detail
              )}
            </dd>
          </motion.div>
        ))}
      </dl>
    </motion.section>
  );
}
