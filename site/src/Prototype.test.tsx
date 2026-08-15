import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Prototype } from "./Prototype";
import "./prototype.css";

describe("portfolio experience", () => {
  it("presents the approved first impression and public navigation", () => {
    render(<Prototype />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /ideias ganham forma\. processos viram produto\./i,
      }),
    ).toBeInTheDocument();
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
    expect(screen.getByText("11 projetos no arquivo")).toBeInTheDocument();

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

  it("persists an explicit dark theme preference", async () => {
    const user = userEvent.setup();
    render(<Prototype />);

    await user.click(screen.getByRole("button", { name: "Ativar tema escuro" }));
    expect(document.documentElement).toHaveAttribute("data-theme", "dark");
    expect(window.localStorage.getItem("mm-theme")).toBe("dark");
    expect(screen.getByRole("button", { name: "Ativar tema claro" })).toBeVisible();
  });
});
