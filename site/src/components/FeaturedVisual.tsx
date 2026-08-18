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

export function AutomationVisual() {
  const steps = [
    { icon: Flash, title: "Evento", text: "Fim do processo", status: "Iniciado", tone: "coral" },
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
          <div className="flow-row" key={step.title}>
            <IconSocket icon={step.icon} accent={step.tone} />
            <div className="flow-row__copy">
              <strong>{step.title}</strong>
              <span>{step.text}</span>
            </div>
            <span className={`status status--${step.tone}`}>{step.status}</span>
            {index < steps.length - 1 ? <span className="flow-connector" aria-hidden="true" /> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

export function DataVisual() {
  return (
    <div className="data-board visual-board">
      <div className="board-rail" aria-hidden="true" />
      <div className="data-sources">
        <span className="board-label">Fontes</span>
        <div className="source-card">
          <Database width={28} height={28} strokeWidth={1.7} aria-hidden />
          <div><strong>Banco de dados</strong><span>Dados operacionais</span></div>
        </div>
        <div className="source-card">
          <DatabaseStats width={28} height={28} strokeWidth={1.7} aria-hidden />
          <div><strong>Base de análise</strong><span>Informação consolidada</span></div>
        </div>
        <div className="source-card">
          <Page width={28} height={28} strokeWidth={1.7} aria-hidden />
          <div><strong>Arquivo gerado</strong><span>Saída para análise</span></div>
        </div>
      </div>
      <div className="data-arrow" aria-hidden="true"><ArrowRight /></div>
      <div className="analysis-card">
        <span className="board-label">Análise</span>
        <IconSocket icon={GraphUp} accent="cobalt" size="large" />
        <strong>Consolidar</strong>
        <p>Transformar dados em informação confiável.</p>
        <span className="status status--cobalt">Processando</span>
      </div>
      <div className="data-arrow" aria-hidden="true"><ArrowRight /></div>
      <div className="insight-card">
        <span className="board-label">Saída</span>
        <IconSocket icon={LightBulbOn} accent="aqua" size="large" />
        <strong>Insights e recomendações</strong>
        <p>Padrões, oportunidades e ações sugeridas.</p>
        <span className="status status--green">Concluído</span>
      </div>
    </div>
  );
}

export function AiVisual() {
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
      <div className="ai-board__header">
        <div>
          <strong>Como posso ajudar hoje?</strong>
          <span>Pergunte ou descreva uma tarefa.</span>
        </div>
        <span className="ai-prompt-mark" aria-hidden="true"><ArrowUpRight /></span>
      </div>
      <div className="ai-modules">
        {modules.map((module) => (
          <div className="ai-module" key={module.title}>
            <IconSocket icon={module.icon} accent={module.tone} size="large" />
            <strong>{module.title}</strong>
            <p>{module.text}</p>
            <span aria-hidden="true"><ArrowRight /></span>
          </div>
        ))}
      </div>
    </div>
  );
}
