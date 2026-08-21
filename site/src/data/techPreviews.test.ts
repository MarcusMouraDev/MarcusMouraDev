import { describe, expect, it } from "vitest";
import pythonSvg from "../../public/assets/tech/python.svg?raw";
import reactSvg from "../../public/assets/tech/react.svg?raw";
import { portfolioItems } from "./portfolio";
import { techInlineContent, techPreviewUrl } from "./techPreviews";

describe("tech preview catalog", () => {
  it("maps known labels to brand mark files", () => {
    expect(techPreviewUrl("Python")).toBe("/assets/tech/python.svg");
    expect(techPreviewUrl("APIs REST")).toBe("/assets/tech/apis-rest.svg");
  });

  it("stores real marks instead of editorial STACK cards", () => {
    expect(pythonSvg).not.toContain("STACK");
    expect(reactSvg).not.toContain("STACK");
    expect(pythonSvg).toMatch(/linearGradient|387EB8|3776AB/i);
    expect(reactSvg).toMatch(/path/i);
  });

  it("falls back to the default card for unknown labels", () => {
    expect(techPreviewUrl("Fortran")).toBe("/assets/tech/default.svg");
  });

  it("joins labels into inline preview copy", () => {
    expect(techInlineContent(["Python"])).toBe("{0}");
    expect(techInlineContent(["Python", "SQL", "Git"])).toBe("{0}, {1} e {2}");
  });

  it("maps every project technology to a named preview, not the fallback", () => {
    const labels = new Set(portfolioItems.flatMap((item) => item.technologies));
    for (const label of labels) {
      expect(techPreviewUrl(label), label).not.toBe("/assets/tech/default.svg");
      expect(techPreviewUrl(label)).toMatch(/^\/assets\/tech\/[a-z0-9-]+\.svg$/);
    }
  });
});
