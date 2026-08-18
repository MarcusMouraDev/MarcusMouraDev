export type PortfolioCategory =
  | "Automação"
  | "Dados"
  | "Web"
  | "Python"
  | "Mobile"
  | "IA";

export type PortfolioItem = {
  id: string;
  title: string;
  editorialTitle?: string;
  collection: "archive" | "lab";
  status: "public" | "private" | "lab";
  category: PortfolioCategory;
  summary: string;
  problem: string;
  contribution: string;
  outcome: string;
  technologies: string[];
  flow: string[];
  href?: string;
  featured: boolean;
};

const demoLink = (project: string) =>
  `mailto:mpfagundesmoura@gmail.com?subject=${encodeURIComponent(
    `Demonstração do projeto ${project}`,
  )}`;

export const portfolioItems: PortfolioItem[] = [
  {
    id: "acionamento-clientes",
    title: "Acionamento de Clientes",
    editorialTitle: "Automação de processos",
    collection: "archive",
    status: "private",
    category: "Automação",
    summary:
      "Hook de fim de processo, e-mails automáticos e atualização de planilhas.",
    problem:
      "O encerramento de rotinas exigia ações repetitivas de comunicação, conferência e atualização de controles.",
    contribution:
      "Modelei o fluxo para reagir ao fim do processo, validar os dados e executar cada ação com registro do estado.",
    outcome:
      "Base, comunicação e acompanhamento reunidos em um fluxo automatizado, claro e rastreável.",
    technologies: ["Banco de dados", "E-mail automático", "Planilhas", "Automação"],
    flow: ["Evento concluído", "Validar dados", "E-mail e planilha", "Registrar conclusão"],
    href: demoLink("Acionamento de Clientes"),
    featured: true,
  },
  {
    id: "faturamento-insights",
    title: "Automação de Acompanhamento de Faturamento",
    editorialTitle: "Dados para decisão",
    collection: "archive",
    status: "private",
    category: "Dados",
    summary:
      "Extração de bancos, arquivos analíticos e informação consolidada para decisões.",
    problem:
      "Dados operacionais dispersos dificultavam a análise de processos, resultados e oportunidades de melhoria.",
    contribution:
      "Estruturei extração, transformação, geração de arquivos e uma saída de insights sem expor informações sensíveis.",
    outcome:
      "Informações consolidadas para apoiar análises de processos, resultados e tomada de decisão.",
    technologies: ["Banco de dados", "Trino", "Tableau", "SharePoint"],
    flow: ["Fontes de dados", "Extrair", "Consolidar", "Gerar insights"],
    href: demoLink("Automação de Acompanhamento de Faturamento"),
    featured: true,
  },
  {
    id: "chatbots-atendimento",
    title: "Chatbots de Atendimento",
    collection: "archive",
    status: "private",
    category: "Automação",
    summary:
      "Chatbots em Python com integrações por APIs, histórico e agendamento automatizado.",
    problem:
      "Atendimentos repetitivos precisavam ser organizados sem perder contexto entre conversa e agendamento.",
    contribution:
      "Conectei regras de atendimento, histórico, APIs e agenda em uma jornada contínua.",
    outcome:
      "Conversas transformadas em atendimentos e agendamentos organizados em um fluxo contínuo.",
    technologies: ["Python", "APIs", "Banco de dados", "Agendamento"],
    flow: ["Mensagem", "Entender intenção", "Consultar contexto", "Agendar"],
    href: demoLink("Chatbots de Atendimento"),
    featured: false,
  },
  {
    id: "saldo",
    title: "Saldo",
    collection: "archive",
    status: "private",
    category: "Web",
    summary:
      "PWA de finanças pessoais, privada e offline, com lançamentos, metas, recorrências e backup.",
    problem:
      "Organizar a vida financeira sem depender de contas externas ou conectividade constante.",
    contribution:
      "Projetei uma experiência local-first com dados no dispositivo e fluxo financeiro completo.",
    outcome:
      "Experiência offline-first, dados locais e uma leitura financeira coerente para o uso diário.",
    technologies: ["JavaScript", "IndexedDB", "PWA", "CSS"],
    flow: ["Registrar", "Organizar", "Acompanhar", "Fazer backup"],
    href: demoLink("Saldo"),
    featured: false,
  },
  {
    id: "inter-task-monitor",
    title: "Inter Task Monitor",
    collection: "archive",
    status: "private",
    category: "Web",
    summary:
      "Sistema de tarefas com Kanban, indicadores, filtros, API HTTP e persistência SQLite.",
    problem:
      "Tarefas e indicadores precisavam coexistir em uma interface única, consultável e atualizável.",
    contribution:
      "Construí banco, API, operações CRUD, filtros, indicadores e a interface Kanban.",
    outcome:
      "Produto funcional do banco de dados ao Kanban e aos indicadores de acompanhamento.",
    technologies: ["Python", "SQLite", "REST API", "JavaScript"],
    flow: ["Criar tarefa", "Priorizar", "Mover no Kanban", "Acompanhar"],
    href: demoLink("Inter Task Monitor"),
    featured: false,
  },
  {
    id: "clima-openweather",
    title: "Clima OpenWeather",
    collection: "archive",
    status: "public",
    category: "Python",
    summary:
      "Consulta climática em tempo real com histórico, tratamento de erros e arquitetura em camadas.",
    problem:
      "Consumir dados externos com tratamento consistente de respostas, falhas e persistência de histórico.",
    contribution:
      "Separei domínio, integração, persistência e análise em componentes orientados a objetos.",
    outcome:
      "Integração de API, persistência e análise de dados organizadas em camadas legíveis.",
    technologies: ["Python", "OpenWeather", "SQLAlchemy", "Pandas"],
    flow: ["Consultar API", "Validar resposta", "Persistir", "Analisar histórico"],
    href:
      "https://github.com/MarcusMouraDev/Meu-Portif-lio-/blob/main/sistema_clima_openweather.py",
    featured: false,
  },
  {
    id: "sistema-usuarios",
    title: "Sistema de Usuários",
    collection: "archive",
    status: "public",
    category: "Python",
    summary:
      "CRUD de usuários com persistência relacional, responsabilidades separadas e POO.",
    problem:
      "Modelar operações de cadastro e consulta mantendo regras, persistência e interface desacopladas.",
    contribution:
      "Estruturei entidades, operações CRUD e persistência relacional com arquitetura simples.",
    outcome:
      "CRUD relacional com responsabilidades claras e base adequada para evolução e testes.",
    technologies: ["Python", "SQLAlchemy", "SQLite", "POO"],
    flow: ["Validar", "Persistir", "Consultar", "Atualizar"],
    href: "https://github.com/MarcusMouraDev/Meu-Portif-lio-",
    featured: false,
  },
  {
    id: "rpg-faculdade",
    title: "RPG de Faculdade",
    collection: "archive",
    status: "public",
    category: "Python",
    summary:
      "RPG de terminal com personagem, classes, missões, batalha e progressão de experiência.",
    problem:
      "Organizar múltiplos estados e regras de progressão sem misturar a lógica de cada sistema.",
    contribution:
      "Modelei personagem, missões, batalha, níveis e recompensas com orientação a objetos.",
    outcome:
      "Regras de negócio, estados e progressão reunidos em uma experiência reproduzível.",
    technologies: ["Python", "POO", "Game Logic"],
    flow: ["Criar personagem", "Receber missão", "Batalhar", "Evoluir"],
    href:
      "https://github.com/MarcusMouraDev/Meu-Portif-lio-/tree/main/rpg-faculdade",
    featured: false,
  },
  {
    id: "barber-academy",
    title: "Barber Academy",
    collection: "archive",
    status: "public",
    category: "Web",
    summary:
      "Fluxo de agendamento para barbearia integrado ao WhatsApp e pensado para reduzir atrito.",
    problem:
      "A passagem entre escolha do serviço e contato precisava ser curta e compreensível no celular.",
    contribution:
      "Desenhei uma jornada responsiva que conduz intenção, escolha e conversa no WhatsApp.",
    outcome:
      "Jornada curta entre intenção, agendamento e atendimento, com poucos pontos de decisão.",
    technologies: ["HTML", "CSS", "JavaScript", "WhatsApp"],
    flow: ["Escolher serviço", "Selecionar horário", "Revisar", "Conversar"],
    href: "https://github.com/MarcusMouraDev/Meu-Portif-lio-",
    featured: false,
  },
  {
    id: "jogo-forca",
    title: "Jogo da Forca",
    collection: "archive",
    status: "public",
    category: "Python",
    summary:
      "Jogo clássico estruturado com classes, controle de tentativas e validação de entrada.",
    problem:
      "Separar palavra, estado visual, entrada e regras da partida sem duplicar responsabilidades.",
    contribution:
      "Organizei o jogo em classes independentes e tratei entradas e feedback de cada estado.",
    outcome:
      "Validação de entrada e lógica de jogo separadas em componentes orientados a objetos.",
    technologies: ["Python", "POO", "CLI"],
    flow: ["Escolher nível", "Receber palavra", "Tentar letra", "Concluir partida"],
    href:
      "https://github.com/MarcusMouraDev/Meu-Portif-lio-/blob/main/jogo-da-forca-poo/jogo_da_forca.py",
    featured: false,
  },
  {
    id: "saldo-ios",
    title: "Saldo iOS",
    collection: "archive",
    status: "private",
    category: "Mobile",
    summary:
      "Experimento mobile financeiro com foco em leitura rápida, privacidade e experiência nativa.",
    problem:
      "Traduzir o acompanhamento financeiro para uma interação móvel concisa e cotidiana.",
    contribution:
      "Desenhei componentes e estados nativos priorizando clareza, privacidade e uso recorrente.",
    outcome:
      "Interface nativa focada em clareza, privacidade e acompanhamento financeiro diário.",
    technologies: ["SwiftUI", "iOS", "UX"],
    flow: ["Abrir resumo", "Ler situação", "Registrar movimento", "Acompanhar"],
    href: demoLink("Saldo iOS"),
    featured: false,
  },
  {
    id: "assistente-pessoal-ia",
    title: "Assistente pessoal de IA",
    collection: "lab",
    status: "lab",
    category: "IA",
    summary:
      "IA personalizada com memória controlada, habilidades reutilizáveis e automações.",
    problem:
      "Automatizar tarefas cotidianas preservando privacidade, transparência e controle sobre cada execução.",
    contribution:
      "Estou organizando contratos internos, memória, ferramentas explícitas e fallback controlado em nuvem.",
    outcome:
      "Uma arquitetura em evolução para transformar intenção em ações observáveis e reutilizáveis.",
    technologies: ["Python", "Ollama", "Agentes", "Automação"],
    flow: ["Entender contexto", "Consultar memória", "Escolher habilidade", "Executar ação"],
    href:
      "mailto:mpfagundesmoura@gmail.com?subject=Conversa%20sobre%20o%20Assistente%20Pessoal%20de%20IA",
    featured: true,
  },
];

export const archiveItems = portfolioItems.filter(
  (item) => item.collection === "archive",
);

export const featuredItems = portfolioItems.filter((item) => item.featured);

export const labItem = portfolioItems.find(
  (item) => item.collection === "lab",
) as PortfolioItem;

export const archiveCategories: Array<"Todos" | PortfolioCategory> = [
  "Todos",
  "Automação",
  "Dados",
  "Web",
  "Python",
  "Mobile",
];
