import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ArrowRight } from "iconoir-react";
import { CaseDialog } from "./components/CaseDialog";
import { SiteHeader } from "./components/SiteHeader";
import { AboutSection } from "./components/sections/AboutSection";
import { ContactSection } from "./components/sections/ContactSection";
import { FeaturedCasesSection } from "./components/sections/FeaturedCasesSection";
import { HeroSection } from "./components/sections/HeroSection";
import { ProjectArchiveSection } from "./components/sections/ProjectArchiveSection";
import type { RevealProps, Theme } from "./components/sections/types";
import {
  archiveItems,
  type PortfolioCategory,
  type PortfolioItem,
} from "./data/portfolio";

function readStoredTheme(): Theme {
  if (typeof window === "undefined") return "light";
  const stored = window.localStorage.getItem("mm-theme");
  if (stored === "dark" || stored === "light") return stored;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function Prototype() {
  const reduceMotion = useReducedMotion();
  const [theme, setTheme] = useState<Theme>(readStoredTheme);
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);
  const [activeCategory, setActiveCategory] = useState<"Todos" | PortfolioCategory>("Todos");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.style.colorScheme = theme;
    const themeColor = document.querySelector('meta[name="theme-color"]:not([media])');
    if (themeColor) {
      themeColor.setAttribute("content", theme === "dark" ? "#0e1112" : "#f3f4f1");
    }
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
    window.localStorage.setItem("mm-theme", nextTheme);
  };

  const reveal: RevealProps = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, transform: "translateY(18px)" },
        whileInView: { opacity: 1, transform: "translateY(0px)" },
        viewport: { once: true, amount: 0.15 },
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      };

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <SiteHeader theme={theme} onToggleTheme={toggleTheme} />

      <main id="conteudo">
        <HeroSection reveal={reveal} onSelectItem={setSelectedItem} />
        <FeaturedCasesSection reveal={reveal} onSelectItem={setSelectedItem} />
        <ProjectArchiveSection
          reveal={reveal}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          visibleProjects={visibleProjects}
          onSelectItem={setSelectedItem}
        />
        <AboutSection reveal={reveal} />
        <ContactSection reveal={reveal} />
      </main>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} Marcus Moura</span>
        <a href="#top">
          Voltar ao início <ArrowRight aria-hidden />
        </a>
      </footer>

      <CaseDialog item={selectedItem} onOpenChange={(open) => !open && setSelectedItem(null)} />
    </>
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
