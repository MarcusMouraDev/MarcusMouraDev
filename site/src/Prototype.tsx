import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowRight } from "iconoir-react";
import { CaseDetailPanel } from "./components/CaseDetailPanel";
import { CursorLight } from "./components/CursorLight";
import { SiteHeader } from "./components/SiteHeader";
import { AboutSection } from "./components/sections/AboutSection";
import { ContactSection } from "./components/sections/ContactSection";
import { FeaturedCasesSection } from "./components/sections/FeaturedCasesSection";
import { HeroSection } from "./components/sections/HeroSection";
import { ProjectArchiveSection } from "./components/sections/ProjectArchiveSection";
import { ModalCardsTw } from "./components/ui/modal-cards-tw";
import { ScrollMaskTw } from "./components/ui/scroll-mask-tw";
import type { CaseSelectHandler } from "./components/sections/types";
import {
  archiveItems,
  portfolioItems,
  type PortfolioCategory,
  type PortfolioItem,
} from "./data/portfolio";
import { portfolioToModalCard } from "./data/portfolioModalCards";
import { useRevealOnce } from "./motion";
import { ScrollProgress } from "./components/ScrollProgress";

type PrototypeProps = {
  introReady?: boolean;
};

export function Prototype({ introReady = true }: PrototypeProps) {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [morphModal, setMorphModal] = useState(false);
  const [activeCategory, setActiveCategory] = useState<"Todos" | PortfolioCategory>("Todos");
  const reveal = useRevealOnce();
  const modalCards = useMemo(() => portfolioItems.map(portfolioToModalCard), []);

  const handleSelectItem: CaseSelectHandler = (item, options) => {
    setMorphModal(Boolean(options?.morph));
    setSelectedItem(item);
  };

  const visibleProjects = useMemo(
    () =>
      activeCategory === "Todos"
        ? archiveItems
        : archiveItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <ModalCardsTw
      cards={modalCards}
      selectedId={selectedItem?.id ?? null}
      onSelectedIdChange={(id) => {
        if (!id) {
          setSelectedItem(null);
          setMorphModal(false);
        }
      }}
      animationVariant={morphModal ? "scale" : "fade"}
      ariaLabel="Detalhes do projeto"
      renderModal={(card, close) => {
        const item = portfolioItems.find((entry) => entry.id === card.id);
        return item ? <CaseDetailPanel item={item} onClose={close} morphTitle={morphModal} /> : null;
      }}
    >
      <ScrollProgress />
      <CursorLight />

      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <SiteHeader />

      <main id="conteudo">
        <HeroSection
          onSelectItem={handleSelectItem}
          introReady={introReady}
        />
        <ScrollMaskTw
          className="work-opening"
          variant="iris"
          mode="reveal"
          background="#f3f4f1"
          ariaLabel="Abertura do portfólio"
        >
          <p className="eyebrow">Arquivo</p>
          <p className="work-opening__title">O arquivo vem em seguida.</p>
          <p className="work-opening__note">Cada card abre o projeto.</p>
        </ScrollMaskTw>
        <FeaturedCasesSection onSelectItem={handleSelectItem} />
        <ProjectArchiveSection
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          visibleProjects={visibleProjects}
          onSelectItem={handleSelectItem}
          selectedId={selectedItem?.id ?? null}
        />
        <AboutSection reveal={reveal} />
        <ContactSection reveal={reveal} />
      </main>

      <motion.footer className="site-footer" {...reveal}>
        <span>© {new Date().getFullYear()} Marcus Moura</span>
        <a href="#top">
          Voltar ao início <ArrowRight aria-hidden />
        </a>
      </motion.footer>
    </ModalCardsTw>
  );
}

export function ProjectLink({ item }: { item: PortfolioItem }) {
  if (!item.href) return null;
  const isExternal = item.href.startsWith("http");
  return (
    <a href={item.href} target={isExternal ? "_blank" : undefined} rel={isExternal ? "noreferrer" : undefined}>
      Abrir projeto
    </a>
  );
}
