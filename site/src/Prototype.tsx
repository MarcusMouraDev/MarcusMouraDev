import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  BrainElectricity,
  CodeBrackets,
  Database,
  DatabaseStats,
  Github,
  HalfMoon,
  Linkedin,
  Mail,
  NetworkRight,
  Page,
  SmartphoneDevice,
  SunLight,
  Terminal,
  Whatsapp,
} from "iconoir-react";
import { CaseDialog } from "./components/CaseDialog";
import { AiVisual, AutomationVisual, DataVisual } from "./components/FeaturedVisual";
import { IconSocket } from "./components/IconSocket";
import {
  archiveCategories,
  archiveItems,
  featuredItems,
  type PortfolioCategory,
  type PortfolioItem,
} from "./data/portfolio";

const featuredIcons = [NetworkRight, DatabaseStats, BrainElectricity];
const featuredAccents = ["coral", "aqua", "cobalt"] as const;
const featuredFlows = [
  "Hook → e-mail → planilha",
  "Banco → arquivo → insight",
  "Memória → habilidade → ação",
];
const categoryIcons = {
  Automação: NetworkRight,
  Dados: Database,
  Web: CodeBrackets,
  Python: Terminal,
  Mobile: SmartphoneDevice,
  IA: BrainElectricity,
};

type Theme = "light" | "dark";

function isExternalLink(href: string) {
  return href.startsWith("http");
}

export function Prototype() {
  const reduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem("mm-theme") === "dark" ? "dark" : "light";
  });
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<"Todos" | PortfolioCategory>("Todos");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const visibleProjects = useMemo(
    () =>
      activeCategory === "Todos"
        ? archiveItems
        : archiveItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    window.localStorage.setItem("mm-theme", nextTheme);
  };

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 18 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>

      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Marcus Moura — início">
          MM<span aria-hidden="true" />
        </a>
        <nav aria-label="Navegação principal">
          <a href="#projetos">Projetos</a>
          <a href="#sobre">Sobre</a>
          <a href="#contato">Contato</a>
        </nav>
        <button
          className="theme-toggle"
          type="button"
          onClick={toggleTheme}
          aria-label={theme === "light" ? "Ativar tema escuro" : "Ativar tema claro"}
        >
          <span>{theme === "light" ? "Claro" : "Escuro"}</span>
          {theme === "light" ? (
            <SunLight width={22} height={22} strokeWidth={1.7} aria-hidden />
          ) : (
            <HalfMoon width={22} height={22} strokeWidth={1.7} aria-hidden />
          )}
        </button>
      </header>

      <main id="conteudo">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <motion.div className="hero-copy" {...reveal}>
            <p className="eyebrow">Marcus Moura <span /> Software, automação, dados e IA</p>
            <h1 id="hero-title">Ideias ganham forma. <span>Processos viram produto.</span></h1>
            <p className="hero-summary">
              Transformo processos reais em sistemas úteis, claros e confiáveis.
            </p>
            <div className="hero-actions">
              <a className="button button--dark" href="#projetos">
                Conhecer projetos
                <ArrowUpRight width={19} height={19} strokeWidth={1.8} aria-hidden />
              </a>
              <a className="button button--ghost" href="mailto:mpfagundesmoura@gmail.com">
                Falar com Marcus
                <ArrowUpRight width={19} height={19} strokeWidth={1.8} aria-hidden />
              </a>
            </div>
            <div className="proof-line">
              <Page width={20} height={20} strokeWidth={1.7} aria-hidden />
              <span>Arquivo com {archiveItems.length} projetos</span>
            </div>
          </motion.div>

          <motion.div className="hero-showcase" {...reveal}>
            <img className="dot-field dot-field--hero" src="/assets/mm-dot-field.png" alt="" aria-hidden />
            {featuredItems.map((item, index) => {
              const Icon = featuredIcons[index];
              return (
                <motion.button
                  className={`hero-project hero-project--${index + 1}`}
                  type="button"
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  aria-label={`Abrir destaque: ${item.editorialTitle ?? item.title}`}
                  whileHover={reduceMotion ? undefined : { x: 4, rotate: index === 1 ? -0.3 : 0.3 }}
                  transition={{ duration: 0.2 }}
                >
                  <IconSocket icon={Icon} accent={featuredAccents[index]} size="large" />
                  <span className="hero-project__copy">
                    {item.status === "lab" ? <small>LAB · EM CONSTRUÇÃO</small> : null}
                    <strong>{item.editorialTitle ?? item.title}</strong>
                    <span>{featuredFlows[index]}</span>
                  </span>
                  <ArrowRight className="hero-project__arrow" width={32} height={32} strokeWidth={1.7} aria-hidden />
                </motion.button>
              );
            })}
          </motion.div>
        </section>

        <section className="featured-cases" id="projetos" aria-label="Frentes em destaque">
          <motion.article className="case-study" {...reveal}>
            <CaseIntro
              number="01"
              item={featuredItems[0]}
              onOpen={() => setSelectedItem(featuredItems[0])}
            />
            <AutomationVisual />
          </motion.article>

          <motion.article className="case-study" {...reveal}>
            <CaseIntro
              number="02"
              item={featuredItems[1]}
              onOpen={() => setSelectedItem(featuredItems[1])}
            />
            <DataVisual />
          </motion.article>

          <motion.article className="case-study case-study--lab" {...reveal}>
            <CaseIntro
              number="03"
              item={featuredItems[2]}
              onOpen={() => setSelectedItem(featuredItems[2])}
              lab
            />
            <AiVisual />
          </motion.article>
        </section>

        <motion.section
          className="project-archive section-shell"
          aria-label="Arquivo de projetos"
          {...reveal}
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Arquivo selecionado</p>
              <h2 id="archive-title">{archiveItems.length} projetos. <span>Sem números inventados.</span></h2>
            </div>
            <p>
              <strong>{archiveItems.length} projetos no arquivo</strong>
              <span> · 5 repositórios analisados</span>
            </p>
          </div>

          <div className="archive-filters" aria-label="Filtrar projetos">
            {archiveCategories.map((category) => (
              <button
                type="button"
                key={category}
                aria-pressed={activeCategory === category}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="archive-list" aria-live="polite">
            {visibleProjects.map((item, index) => {
              const Icon = categoryIcons[item.category];
              return (
                <article className="archive-row" key={item.id}>
                  <span className="archive-row__number">
                    {String(archiveItems.indexOf(item) + 1).padStart(2, "0")}
                  </span>
                  <IconSocket icon={Icon} accent={item.category === "Mobile" ? "aqua" : "cobalt"} />
                  <div className="archive-row__title">
                    <span>{item.category}</span>
                    <h3>{item.editorialTitle ?? item.title}</h3>
                    {item.editorialTitle ? <small>{item.title}</small> : null}
                  </div>
                  <p>{item.outcome}</p>
                  <ul className="archive-row__tags" aria-label={`Tecnologias de ${item.title}`}>
                    {item.technologies.slice(0, 3).map((technology) => (
                      <li key={technology}>{technology}</li>
                    ))}
                  </ul>
                  <button
                    className="archive-row__action"
                    type="button"
                    onClick={() => setSelectedItem(item)}
                    aria-label={`Ver detalhes: ${item.editorialTitle ?? item.title}`}
                  >
                    <span>Detalhes</span>
                    <ArrowUpRight width={20} height={20} strokeWidth={1.8} aria-hidden />
                  </button>
                </article>
              );
            })}
          </div>
        </motion.section>

        <motion.section className="about section-shell" id="sobre" aria-labelledby="about-title" {...reveal}>
          <div className="about-copy">
            <p className="eyebrow">Sobre mim</p>
            <h2 id="about-title">Curiosidade técnica. <span>Entrega prática.</span></h2>
            <p className="about-lead">
              Sou Marcus Moura, estudante de Engenharia de Software na UNA e desenvolvedor de
              sistemas, automações e experiências digitais.
            </p>
            <p>
              Minha experiência com rotinas administrativas, atendimento e documentação me ensinou
              a entender o processo antes de codificar: observo o problema, organizo as regras e
              construo uma solução clara para quem vai utilizá-la.
            </p>
          </div>
          <dl className="fact-grid">
            <div><dt>Localização</dt><dd>Belo Horizonte · Brasil</dd></div>
            <div><dt>Formação</dt><dd>Engenharia de Software · UNA</dd></div>
            <div><dt>Foco</dt><dd>Python · APIs REST · SQL · automação</dd></div>
            <div><dt>Explorando</dt><dd>IA local · agentes · produtos úteis</dd></div>
            <div><dt>Idiomas</dt><dd>Português nativo · inglês intermediário</dd></div>
            <div><dt>Disponível</dt><dd>Oportunidades · projetos · colaborações</dd></div>
          </dl>
          <div className="technology-strip" aria-label="Tecnologias e ferramentas">
            {["Python", "APIs REST", "SQL", "SQLite", "SQLAlchemy", "Pandas", "n8n", "Ollama", "JavaScript", "SwiftUI", "Git"].map(
              (technology) => <span key={technology}>{technology}</span>,
            )}
          </div>
        </motion.section>

        <motion.section className="contact section-shell" id="contato" aria-labelledby="contact-title" {...reveal}>
          <img className="dot-field dot-field--contact" src="/assets/mm-dot-field.png" alt="" aria-hidden />
          <div className="contact-kicker">Tecnologia com propósito. Processos com clareza.</div>
          <h2 id="contact-title">Vamos construir <span>algo útil?</span></h2>
          <p>Se você trabalha com software, automação, dados ou IA aplicada, vamos conversar.</p>
          <a className="button button--light" href="mailto:mpfagundesmoura@gmail.com">
            Conversar
            <ArrowUpRight width={20} height={20} strokeWidth={1.8} aria-hidden />
          </a>
          <div className="contact-links">
            <a href="mailto:mpfagundesmoura@gmail.com"><Mail aria-hidden /> E-mail</a>
            <a href="https://wa.me/5531993555554" target="_blank" rel="noreferrer"><Whatsapp aria-hidden /> WhatsApp</a>
            <a href="https://www.linkedin.com/in/marcuspaulomoura" target="_blank" rel="noreferrer"><Linkedin aria-hidden /> LinkedIn</a>
            <a href="https://github.com/MarcusMouraDev" target="_blank" rel="noreferrer"><Github aria-hidden /> GitHub</a>
          </div>
        </motion.section>
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Marcus Moura</span>
        <a href="#top">Voltar ao início <ArrowRight aria-hidden /></a>
      </footer>

      <CaseDialog item={selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)} />
    </>
  );
}

type CaseIntroProps = {
  number: string;
  item: PortfolioItem;
  onOpen: () => void;
  lab?: boolean;
};

function CaseIntro({ number, item, onOpen, lab = false }: CaseIntroProps) {
  return (
    <div className="case-intro">
      <div className="case-number">{number}<span aria-hidden="true" /></div>
      {lab ? <span className="lab-badge">LAB · EM CONSTRUÇÃO</span> : null}
      <h2>{item.editorialTitle ?? item.title}</h2>
      <span className="case-rule" aria-hidden="true" />
      <p>{item.summary}</p>
      <button className="button button--ghost" type="button" onClick={onOpen}>
        {lab ? "Ver arquitetura" : "Ver detalhes do case"}
        <ArrowUpRight width={19} height={19} strokeWidth={1.8} aria-hidden />
      </button>
    </div>
  );
}

export function ProjectLink({ item }: { item: PortfolioItem }) {
  if (!item.href) return null;
  return (
    <a
      href={item.href}
      target={isExternalLink(item.href) ? "_blank" : undefined}
      rel={isExternalLink(item.href) ? "noreferrer" : undefined}
    >
      Abrir projeto
    </a>
  );
}
