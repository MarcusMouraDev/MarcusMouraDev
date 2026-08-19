import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Prototype } from "./Prototype";
import "./prototype.css";

function stubMatchMedia(matchesQuery: (query: string) => boolean) {
  vi.stubGlobal(
    "matchMedia",
    (query: string) =>
      ({
        matches: matchesQuery(query),
        media: query,
        onchange: null,
        addListener: () => undefined,
        removeListener: () => undefined,
        addEventListener: () => undefined,
        removeEventListener: () => undefined,
        dispatchEvent: () => false,
      }) satisfies MediaQueryList,
  );
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
        name: /ideias ganham forma\. processos viram produto\./i,
      }),
    ).toBeInTheDocument();
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
    expect(screen.getByText(/transformo processos reais/i)).toHaveTextContent(/11 projetos/i);
    expect(screen.queryByText("11 projetos no arquivo")).not.toBeInTheDocument();
  });

  it("renders 11 archive entries and keeps the AI lab clearly marked", () => {
    render(<Prototype />);

    const archive = screen.getByRole("region", { name: "Arquivo de projetos" });
    expect(within(archive).getAllByRole("article")).toHaveLength(11);
    expect(
      within(archive).getByRole("heading", {
        level: 2,
        name: "11 projetos. Sem números inventados.",
      }),
    ).toBeVisible();
    expect(screen.getAllByText("LAB · EM CONSTRUÇÃO").length).toBeGreaterThan(0);
  });

  it("filters the archive without changing the source count", async () => {
    const user = userEvent.setup();
    render(<Prototype />);

    const archive = screen.getByRole("region", { name: "Arquivo de projetos" });
    await user.click(screen.getByRole("button", { name: "Dados" }));
    expect(within(archive).getAllByRole("article")).toHaveLength(1);
    expect(screen.queryByText("11 projetos no arquivo")).not.toBeInTheDocument();
    expect(screen.getByText("Públicos e privados selecionados")).toBeInTheDocument();
    expect(screen.queryByText(/5 repositórios analisados/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Todos" }));
    expect(within(archive).getAllByRole("article")).toHaveLength(11);
  });

  it("opens an accessible case dialog and closes it with Escape", async () => {
    const user = userEvent.setup();
    render(<Prototype />);

    await user.click(
      screen.getByRole("button", { name: "Ver detalhes: Automação de processos" }),
    );
    expect(screen.getByRole("dialog", { name: "Automação de processos" })).toBeVisible();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(getComputedStyle(document.querySelector(".dialog-backdrop")!).pointerEvents).toBe(
      "none",
    );
  });

  it("keeps process board copy visible when motion is reduced", () => {
    stubMatchMedia((query) => query.includes("prefers-reduced-motion"));
    render(<Prototype />);

    expect(screen.getByText("Evento")).toBeVisible();
    expect(screen.getByText("Processar dados")).toBeVisible();
    expect(screen.getByText("Fontes")).toBeVisible();
    expect(screen.getAllByText("Memória").length).toBeGreaterThan(0);
  });

  it("persists an explicit dark theme preference", async () => {
    const user = userEvent.setup();
    render(<Prototype />);

    await user.click(screen.getByRole("button", { name: "Ativar tema escuro" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(window.localStorage.getItem("mm-theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Ativar tema claro" })).toBeVisible();
  });
});
