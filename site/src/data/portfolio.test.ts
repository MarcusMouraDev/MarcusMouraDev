import { describe, expect, it } from "vitest";
import { archiveItems, labItem, portfolioItems } from "./portfolio";

describe("portfolio content", () => {
  it("derives an archive of exactly 11 real projects", () => {
    expect(archiveItems).toHaveLength(11);
    expect(archiveItems.every((item) => item.collection === "archive")).toBe(true);
  });

  it("keeps the personal AI assistant outside the archive count", () => {
    expect(labItem.collection).toBe("lab");
    expect(labItem.status).toBe("lab");
    expect(labItem.title).toBe("Assistente pessoal de IA");
  });

  it("uses only the current GitHub account in public links", () => {
    const serialized = JSON.stringify(portfolioItems);
    expect(serialized).not.toContain("MarcusPaulodev1");
    expect(serialized).toContain("MarcusMouraDev");
  });

  it("does not publish an education date range or invented quantitative outcomes", () => {
    const serialized = JSON.stringify(portfolioItems);
    expect(serialized).not.toMatch(/2026\s*[—-]\s*2029/);
    expect(serialized).not.toMatch(/\b\d+%\b/);
  });

  it("gives every item a qualitative outcome and at least one technology", () => {
    for (const item of portfolioItems) {
      expect(item.outcome.trim().length).toBeGreaterThan(20);
      expect(item.technologies.length).toBeGreaterThan(0);
    }
  });
});
