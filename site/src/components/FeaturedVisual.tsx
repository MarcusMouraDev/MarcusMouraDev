import { motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BrainElectricity,
  CheckCircle,
  DataTransferCheck,
  Database,
  DatabaseStats,
  Flash,
  GraphUp,
  LightBulbOn,
  NetworkRight,
  Page,
  SendMail,
  Settings,
} from "iconoir-react";
import { FLOW_EASE, STAGGER_SECONDS, useMotionEnabled, useStagger } from "../motion";
import { IconSocket } from "./IconSocket";

function markInView(entry?: IntersectionObserverEntry | null) {
  entry?.target.classList.add("is-in");
}

export function AutomationVisual() {
  const stepMotion = useStagger();
  const motionEnabled = useMotionEnabled();
  const steps = [
    { icon: Flash, title: "Evento", text: "Fim do processo", status: "Iniciado", tone: "cobalt" },
    {
      icon: DataTransferCheck,
      title: "Processar dados",
      text: "Transformar e validar",
      status: "Em execução",
      tone: "cobalt",
    },
    {
      icon: SendMail,
      title: "Executar ações",
      text: "E-mail e planilha",
      status: "Em andamento",
      tone: "cobalt",
    },
    {
      icon: CheckCircle,
      title: "Finalizar",
      text: "Registro e notificação",
      status: "Concluído",
      tone: "green",
    },
  ] as const;

  return (
    <div className="automation-board visual-board">
      <div className="board-rail" aria-hidden="true" />
      <div className="automation-flow">
        {steps.map((step, index) => {
          const isLast = index === steps.length - 1;
          return (
            <motion.div
              className="flow-row"
              key={step.title}
              {...stepMotion(index)}
              onViewportEnter={markInView}
            >
              <motion.span
                className="flow-row__icon"
                initial={motionEnabled && isLast ? { transform: "scale(0.97)" } : false}
                whileInView={{ transform: "scale(1)" }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{ duration: 0.25, delay: index * STAGGER_SECONDS, ease: FLOW_EASE }}
              >
                <IconSocket icon={step.icon} accent={step.tone} />
              </motion.span>
              <div className="flow-row__copy">
                <strong>{step.title}</strong>
                <span>{step.text}</span>
              </div>
              <span className={`status status--${step.tone}`}>{step.status}</span>
              {index < steps.length - 1 ? (
                <motion.span
                  className="flow-connector"
                  aria-hidden="true"
                  initial={motionEnabled ? { transform: "scaleY(0)" } : false}
                  whileInView={{ transform: "scaleY(1)" }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{
                    duration: 0.25,
                    delay: 0.08 + index * STAGGER_SECONDS,
                    ease: FLOW_EASE,
                  }}
                />
              ) : null}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export function DataVisual() {
  const stepMotion = useStagger();
  const motionEnabled = useMotionEnabled();
  const arrowMotion = motionEnabled
    ? {
        initial: { opacity: 0, transform: "translateX(-6px)" },
        whileInView: { opacity: 1, transform: "translateX(0px)" },
        viewport: { once: true, amount: 0.35 } as const,
      }
    : {};

  return (
    <div className="data-board visual-board">
      <div className="board-rail" aria-hidden="true" />
      <motion.div className="data-sources" {...stepMotion(0)} onViewportEnter={markInView}>
        <span className="board-label">Fontes</span>
        <div className="source-card">
          <Database width={28} height={28} strokeWidth={1.7} aria-hidden />
          <div>
            <strong>Banco de dados</strong>
            <span>Dados operacionais</span>
          </div>
        </div>
        <div className="source-card">
          <DatabaseStats width={28} height={28} strokeWidth={1.7} aria-hidden />
          <div>
            <strong>Base de análise</strong>
            <span>Informação consolidada</span>
          </div>
        </div>
        <div className="source-card">
          <Page width={28} height={28} strokeWidth={1.7} aria-hidden />
          <div>
            <strong>Arquivo gerado</strong>
            <span>Saída para análise</span>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="data-arrow"
        aria-hidden="true"
        {...arrowMotion}
        transition={{ duration: 0.25, delay: STAGGER_SECONDS, ease: FLOW_EASE }}
      >
        <ArrowRight />
      </motion.div>
      <motion.div className="analysis-card" {...stepMotion(1)} onViewportEnter={markInView}>
        <span className="board-label">Análise</span>
        <IconSocket icon={GraphUp} accent="cobalt" size="large" />
        <strong>Consolidar</strong>
        <p>Transformar dados em informação confiável.</p>
        <span className="status status--cobalt">Processando</span>
      </motion.div>
      <motion.div
        className="data-arrow"
        aria-hidden="true"
        {...arrowMotion}
        transition={{ duration: 0.25, delay: STAGGER_SECONDS * 2, ease: FLOW_EASE }}
      >
        <ArrowRight />
      </motion.div>
      <motion.div className="insight-card" {...stepMotion(2)} onViewportEnter={markInView}>
        <span className="board-label">Saída</span>
        <IconSocket icon={LightBulbOn} accent="aqua" size="large" />
        <strong>Insights e recomendações</strong>
        <p>Padrões, oportunidades e ações sugeridas.</p>
        <span className="status status--green">Concluído</span>
      </motion.div>
    </div>
  );
}

export function AiVisual() {
  const stepMotion = useStagger();
  const modules = [
    {
      icon: BrainElectricity,
      title: "Memória",
      text: "Preferência e histórico, no seu controle.",
      tone: "cobalt",
    },
    {
      icon: Settings,
      title: "Habilidades",
      text: "Ações e integrações que dá para reusar.",
      tone: "cobalt",
    },
    {
      icon: NetworkRight,
      title: "Automações",
      text: "Tarefas inteiras, com autonomia.",
      tone: "aqua",
    },
  ] as const;

  return (
    <div className="ai-board visual-board">
      <div className="board-rail" aria-hidden="true" />
      <motion.div className="ai-board__header" {...stepMotion(0)}>
        <div>
          <strong>Como posso ajudar hoje?</strong>
          <span>Pergunte ou descreva uma tarefa.</span>
        </div>
        <span className="ai-prompt-mark" aria-hidden="true">
          <ArrowUpRight />
        </span>
      </motion.div>
      <div className="ai-modules">
        {modules.map((module, index) => (
          <motion.div className="ai-module" key={module.title} {...stepMotion(index, STAGGER_SECONDS * 2)}>
            <IconSocket icon={module.icon} accent={module.tone} size="large" />
            <strong>{module.title}</strong>
            <p>{module.text}</p>
            <span aria-hidden="true">
              <ArrowRight />
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
