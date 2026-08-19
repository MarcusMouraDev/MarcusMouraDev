import { motion, useReducedMotion } from "motion/react";
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
import { IconSocket } from "./IconSocket";

const flowEase = [0.22, 1, 0.36, 1] as const;

function useStepMotion() {
  const reduceMotion = useReducedMotion();

  return (index: number, extraDelay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, transform: "translateY(8px)" },
          whileInView: { opacity: 1, transform: "translateY(0px)" },
          viewport: { once: true, amount: 0.35 } as const,
          transition: {
            duration: 0.35,
            delay: extraDelay + index * 0.07,
            ease: flowEase,
          },
        };
}

export function AutomationVisual() {
  const stepMotion = useStepMotion();
  const reduceMotion = useReducedMotion();
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
        {steps.map((step, index) => (
          <motion.div className="flow-row" key={step.title} {...stepMotion(index)}>
            <IconSocket icon={step.icon} accent={step.tone} />
            <div className="flow-row__copy">
              <strong>{step.title}</strong>
              <span>{step.text}</span>
            </div>
            <span className={`status status--${step.tone}`}>{step.status}</span>
            {index < steps.length - 1 ? (
              <motion.span
                className="flow-connector"
                aria-hidden="true"
                initial={reduceMotion ? false : { transform: "scaleY(0)" }}
                whileInView={{ transform: "scaleY(1)" }}
                viewport={{ once: true, amount: 0.35 }}
                transition={{
                  duration: 0.35,
                  delay: 0.12 + index * 0.07,
                  ease: flowEase,
                }}
              />
            ) : null}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function DataVisual() {
  const stepMotion = useStepMotion();
  const reduceMotion = useReducedMotion();
  const arrowMotion = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, transform: "translateX(-6px)" },
        whileInView: { opacity: 1, transform: "translateX(0px)" },
        viewport: { once: true, amount: 0.35 } as const,
        transition: { duration: 0.35, ease: flowEase },
      };

  return (
    <div className="data-board visual-board">
      <div className="board-rail" aria-hidden="true" />
      <motion.div className="data-sources" {...stepMotion(0)}>
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
      <motion.div className="data-arrow" aria-hidden="true" {...arrowMotion} transition={{ duration: 0.35, delay: 0.07, ease: flowEase }}>
        <ArrowRight />
      </motion.div>
      <motion.div className="analysis-card" {...stepMotion(1)}>
        <span className="board-label">Análise</span>
        <IconSocket icon={GraphUp} accent="cobalt" size="large" />
        <strong>Consolidar</strong>
        <p>Transformar dados em informação confiável.</p>
        <span className="status status--cobalt">Processando</span>
      </motion.div>
      <motion.div className="data-arrow" aria-hidden="true" {...arrowMotion} transition={{ duration: 0.35, delay: 0.14, ease: flowEase }}>
        <ArrowRight />
      </motion.div>
      <motion.div className="insight-card" {...stepMotion(2)}>
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
  const stepMotion = useStepMotion();
  const modules = [
    {
      icon: BrainElectricity,
      title: "Memória",
      text: "Preferências e histórico sob controle.",
      tone: "cobalt",
    },
    {
      icon: Settings,
      title: "Habilidades",
      text: "Ações e integrações reutilizáveis.",
      tone: "cobalt",
    },
    {
      icon: NetworkRight,
      title: "Automações",
      text: "Tarefas de ponta a ponta com autonomia.",
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
          <motion.div className="ai-module" key={module.title} {...stepMotion(index, 0.08)}>
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
