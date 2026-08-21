import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";
import { Prototype } from "./Prototype";
import "./prototype.css";

function stubMatchMedia(matchesQuery: (query: string) => boolean) {
  const media = (query: string) =>
    ({
      matches: matchesQuery(query),
      media: query,
      onchange: null,
      addListener: () => undefined,
      removeListener: () => undefined,
      addEventListener: () => undefined,
      removeEventListener: () => undefined,
      dispatchEvent: () => false,
    }) satisfies MediaQueryList;

  vi.stubGlobal("matchMedia", media);
  Object.defineProperty(window, "matchMedia", {
    configurable: true,
    writable: true,
    value: media,
  });
}

describe("portfolio experience", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("presents the approved first impression and public navigation", () => {
    render(<Prototype />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /ideias ganham forma\./i,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText(/processos viram produto\./i)).toBeInTheDocument();
    expect(screen.getByText("Marcus Moura", { selector: ".eyebrow__name" })).toBeInTheDocument();
    expect(
      screen.getByText("Software, automação, dados e IA", { selector: ".eyebrow__meta" }),
    ).toBeInTheDocument();
    expect(document.querySelector(".hero .eyebrow > span:empty")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Marcus Moura, início" })).toHaveAttribute(
      "href",
      "#top",
    );
    expect(screen.getByRole("link", { name: "Projetos" })).toHaveAttribute(
      "href",
      "#projetos",
    );
    expect(screen.getByRole("link", { name: "Sobre" })).toHaveAttribute(
      "href",
      "#sobre",
    );
    expect(screen.getByRole("link", { name: "Contato" })).toHaveAttribute(
      "href",
      "#contato",
    );
    expect(screen.getAllByRole("link", { name: "Conversar" }).length).toBeGreaterThan(0);
    expect(screen.getByRole("link", { name: /conhecer projetos/i })).toHaveAttribute(
      "href",
      "#projetos",
    );
    expect(screen.getByText(/faço sistema a partir de processo real/i)).toHaveTextContent(/11 projetos/i);
    expect(screen.queryByText("11 projetos no arquivo")).not.toBeInTheDocument();
  });

  it("renders 11 archive entries and keeps the AI lab clearly marked", () => {
    render(<Prototype />);

    const archive = screen.getByRole("region", { name: "Arquivo de projetos" });
    expect(within(archive).getAllByRole("article")).toHaveLength(11);
    expect(document.querySelectorAll(".archive-card")).toHaveLength(11);
    expect(
      within(archive).getByRole("heading", {
        level: 2,
        name: "11 projetos. Sem métrica inventada.",
      }),
    ).toBeVisible();
    expect(screen.getAllByText("LAB · EM CONSTRUÇÃO").length).toBeGreaterThan(0);
  });

  it("filters the archive without changing the source count", async () => {
    const user = userEvent.setup();
    render(<Prototype />);

    const archive = screen.getByRole("region", { name: "Arquivo de projetos" });
    const dados = screen.getByRole("button", { name: "Dados" });
    await user.click(dados);
    expect(dados).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "Todos" })).toHaveAttribute("aria-pressed", "false");
    await waitFor(() => {
      expect(within(archive).getAllByRole("article")).toHaveLength(1);
    });
    expect(screen.queryByText("11 projetos no arquivo")).not.toBeInTheDocument();
    expect(screen.getByText("Públicos e privados selecionados")).toBeInTheDocument();
    expect(screen.queryByText(/5 repositórios analisados/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Todos" }));
    await waitFor(() => {
      expect(within(archive).getAllByRole("article")).toHaveLength(11);
    });
  });

  it("opens an accessible case dialog and closes it with Escape", async () => {
    const user = userEvent.setup();
    render(<Prototype />);

    await user.click(
      screen.getByRole("button", { name: "Ver detalhes: Automação de processos" }),
    );
    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: "Automação de processos" })).toBeVisible();
    });

    await user.keyboard("{Escape}");
    await waitFor(() => {
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    });
  });

  it("keeps process board copy visible when motion is reduced", () => {
    stubMatchMedia((query) => query.includes("prefers-reduced-motion"));
    render(<Prototype />);

    const board = document.querySelector(".automation-board");
    expect(board).toBeTruthy();
    expect(within(board as HTMLElement).getByText("Evento")).toBeVisible();
    expect(screen.getByText("Processar dados")).toBeVisible();
    expect(screen.getByText("Fontes")).toBeVisible();
    expect(screen.getAllByText("Memória").length).toBeGreaterThan(0);
  });

  it("does not render portrait photos anywhere on the page", () => {
    render(<Prototype />);

    expect(screen.queryByAltText(/Marcus Moura/i)).not.toBeInTheDocument();
    expect(document.querySelector(".hero-portrait")).not.toBeInTheDocument();
    expect(document.querySelector(".about-portrait")).not.toBeInTheDocument();
    expect(document.querySelector(".portrait-stack")).not.toBeInTheDocument();
    expect(document.querySelector('img[src*="portrait"]')).not.toBeInTheDocument();
    expect(document.querySelector('img[src$=".jpg"]')).not.toBeInTheDocument();
    expect(document.querySelector('img[src$=".jpeg"]')).not.toBeInTheDocument();
    expect(document.querySelector('img[src$=".webp"]')).not.toBeInTheDocument();
  });

  it("stays on the light editorial surface with no theme switch", () => {
    render(<Prototype />);

    expect(screen.queryByRole("button", { name: "Ativar tema escuro" })).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Ativar tema claro" })).not.toBeInTheDocument();
    expect(window.localStorage.getItem("mm-theme")).toBeNull();
  });

  it("draws the page stroke when motion is allowed", () => {
    render(<Prototype />);

    expect(document.querySelector(".scroll-line")).toBeInTheDocument();
    expect(document.querySelector(".scroll-line__draw")).toBeInTheDocument();
  });

  it("shows the preloader before the portfolio content", () => {
    render(<App />);

    expect(document.querySelector(".preloader-tw")).toBeInTheDocument();
    expect(screen.getByText(/carregando a magia/i)).toBeInTheDocument();
    expect(document.querySelector(".preloader-tw__mascot")).toBeInTheDocument();
    expect(document.querySelector(".preloader-tw__progress")).not.toBeInTheDocument();
    expect(screen.queryByText("Preparando sua experiência.")).not.toBeInTheDocument();
    expect(screen.queryByText(/👨🏻‍💻/)).not.toBeInTheDocument();
  });

  it("opens the portfolio with a scroll mask and project cards", () => {
    render(<Prototype />);

    expect(screen.getByRole("region", { name: "Abertura do portfólio" })).toBeInTheDocument();
    expect(screen.getByText(/o arquivo vem em seguida/i)).toBeInTheDocument();
    expect(document.querySelector(".scroll-mask-tw")).toBeInTheDocument();
    expect(document.querySelectorAll(".archive-card").length).toBe(11);
  });

  it("opens project details through modal cards", async () => {
    const user = userEvent.setup();
    render(<Prototype />);

    await user.click(
      screen.getByRole("button", { name: "Ver detalhes: Automação de processos" }),
    );

    expect(document.querySelector(".modal-cards-tw__modal")).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole("dialog", { name: "Automação de processos" })).toBeVisible();
    });
  });

  it("shows a hover preview when a technology name is focused in the about copy", async () => {
    render(<Prototype />);

    const about = screen.getByRole("region", { name: /curiosidade técnica/i });
    expect(document.querySelector(".technology-strip")).not.toBeInTheDocument();
    expect(within(about).getByRole("button", { name: "Prévia de React" })).toBeInTheDocument();

    within(about).getByRole("button", { name: "Prévia de React" }).focus();
    await waitFor(() => {
      const preview = document.querySelector(".hover-preview-tw__image");
      expect(preview).toBeInTheDocument();
      expect(preview).toHaveAttribute("src", "/assets/tech/react.svg");
    });
  });
});
