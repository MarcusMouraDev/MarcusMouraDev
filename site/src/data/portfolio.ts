import { mailTo } from "./site";

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

const demoLink = (project: string) => mailTo(`Demonstração do projeto ${project}`);

export const portfolioItems: PortfolioItem[] = [
  {
    id: "acionamento-clientes",
    title: "Acionamento de Clientes",
    editorialTitle: "Automação de processos",
    collection: "archive",
    status: "private",
    category: "Automação",
    summary:
      "Quando o processo termina, o sistema manda e-mail e atualiza a planilha.",
    problem:
      "Fechar a rotina pedia de novo as mesmas ações: avisar alguém, conferir dado e atualizar controle.",
    contribution:
      "O fluxo reage ao fim do processo, valida os dados, executa cada ação e registra o estado.",
    outcome:
      "Base, aviso e acompanhamento ficam no mesmo fluxo, com registro do que aconteceu.",
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
      "Tira dado de banco, gera arquivo analítico e junta a informação para quem decide.",
    problem:
      "Os dados operacionais estavam espalhados. Ficava difícil olhar processo, resultado e o que melhorar.",
    contribution:
      "Separei extração, transformação e geração de arquivo. A saída de insight não expõe dado sensível.",
    outcome:
      "A informação consolidada serve para analisar processo, resultado e decisão.",
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
      "Chatbots em Python, com API, histórico e agendamento automático.",
    problem:
      "Atendimento repetido precisava de ordem, sem perder o contexto entre a conversa e o agendamento.",
    contribution:
      "Liguei regra de atendimento, histórico, API e agenda no mesmo fluxo.",
    outcome:
      "A conversa vira atendimento e agendamento, sem quebrar o contexto.",
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
      "PWA de finança pessoal, privada e offline: lançamento, meta, recorrência e backup.",
    problem:
      "Organizar dinheiro sem conta externa e sem depender de internet o tempo todo.",
    contribution:
      "Os dados ficam no aparelho. Montei o fluxo financeiro completo aí.",
    outcome:
      "Funciona offline. Os dados são locais. Dá para acompanhar o dinheiro no dia a dia.",
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
      "Tarefas com Kanban, indicador, filtro, API HTTP e SQLite.",
    problem:
      "Tarefa e indicador precisavam da mesma tela, consultável e atualizável.",
    contribution:
      "Fiz o banco, a API, o CRUD, os filtros, os indicadores e o Kanban.",
    outcome:
      "O produto cobre do banco até o Kanban e os indicadores.",
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
      "Consulta o clima em tempo real, guarda histórico e trata erro. Código em camadas.",
    problem:
      "Consumir API externa com resposta, falha e histórico tratados do mesmo jeito.",
    contribution:
      "Separei domínio, integração, persistência e análise em objetos.",
    outcome:
      "API, persistência e análise ficam em camadas que dá para ler.",
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
      "CRUD de usuário com banco relacional, cada parte no seu lugar, em POO.",
    problem:
      "Cadastro e consulta sem misturar regra, persistência e interface.",
    contribution:
      "Entidade, CRUD e persistência relacional, numa arquitetura simples.",
    outcome:
      "CRUD relacional com responsabilidade separada. Dá para crescer e testar em cima.",
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
      "RPG de terminal: personagem, classe, missão, batalha e experiência.",
    problem:
      "Vários estados e regras de progresso, sem misturar a lógica de cada sistema.",
    contribution:
      "Personagem, missão, batalha, nível e recompensa em objetos.",
    outcome:
      "Regra, estado e progressão no mesmo jogo, reproduzível.",
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
      "Agendamento de barbearia que cai no WhatsApp, pensado para o celular.",
    problem:
      "Do serviço até o contato, o caminho no celular precisava ser curto e óbvio.",
    contribution:
      "Tela responsiva: intenção, escolha do serviço e conversa no WhatsApp.",
    outcome:
      "Pouca decisão no caminho entre querer agendar e falar com a barbearia.",
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
      "Forca clássica, com classe, controle de tentativa e validação de entrada.",
    problem:
      "Palavra, desenho, entrada e regra da partida, cada um no seu lugar.",
    contribution:
      "Separei o jogo em classes. Tratei entrada e feedback de cada estado.",
    outcome:
      "Validação de entrada e lógica do jogo em componentes separados, em POO.",
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
      "Experimento no iPhone: ver o dinheiro rápido, com privacidade, em interface nativa.",
    problem:
      "Levar o acompanhamento financeiro para o celular, curto, do dia a dia.",
    contribution:
      "Componentes e estados nativos. Privilegiei leitura, privacidade e uso repetido.",
    outcome:
      "Interface nativa, privada, para acompanhar o dinheiro no dia a dia.",
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
      "IA pessoal com memória controlada, habilidade reutilizável e automação.",
    problem:
      "Automatizar tarefa do dia a dia sem perder privacidade, transparência e controle de cada execução.",
    contribution:
      "Ainda estou organizando contrato interno, memória, ferramenta explícita e fallback controlado em nuvem.",
    outcome:
      "Arquitetura em construção: a intenção vira ação que dá para ver e reusar.",
    technologies: ["Python", "Ollama", "Agentes", "Automação"],
    flow: ["Entender contexto", "Consultar memória", "Escolher habilidade", "Executar ação"],
    href: mailTo("Conversa sobre o Assistente Pessoal de IA"),
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
