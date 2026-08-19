import { HalfMoon, SunLight } from "iconoir-react";
import type { Theme } from "./sections/types";

type SiteHeaderProps = {
  theme: Theme;
  onToggleTheme: () => void;
};

export function SiteHeader({ theme, onToggleTheme }: SiteHeaderProps) {
  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="Marcus Moura, início">
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
        onClick={onToggleTheme}
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
  );
}
