import { render } from "@testing-library/react";
import axe from "axe-core";
import { describe, expect, it } from "vitest";
import { Prototype } from "./Prototype";
import "./styles.css";
import "./prototype.css";

function relativeLuminance(hex: string) {
  const channels = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const [red, green, blue] = channels.map((channel) =>
    channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
  );
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
}

function contrastRatio(foreground: string, background: string) {
  const first = relativeLuminance(foreground);
  const second = relativeLuminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

describe("portfolio accessibility", () => {
  it("has no serious or critical automated accessibility violations", async () => {
    render(<Prototype />);

    const result = await axe.run(document.body, {
      rules: {
        "color-contrast": { enabled: false },
      },
    });
    const blockingViolations = result.violations.filter(
      (violation) => violation.impact === "serious" || violation.impact === "critical",
    );

    expect(blockingViolations).toEqual([]);
  });

  it("keeps button copy AA-readable on cobalt and coral hover surfaces", () => {
    for (const theme of ["light", "dark"]) {
      document.documentElement.dataset.theme = theme;
      const styles = getComputedStyle(document.documentElement);
      const cobalt = styles.getPropertyValue("--cobalt").trim();
      const coral = styles.getPropertyValue("--coral").trim();
      const onCobalt = styles.getPropertyValue("--on-cobalt").trim();
      const onCoral = styles.getPropertyValue("--on-coral").trim();
      const ink = styles.getPropertyValue("--ink").trim();
      const buttonDarkText = styles.getPropertyValue("--button-dark-text").trim();

      expect(contrastRatio(buttonDarkText, ink)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(onCobalt, cobalt)).toBeGreaterThanOrEqual(4.5);
      expect(contrastRatio(onCoral, coral)).toBeGreaterThanOrEqual(4.5);
    }
  });
});
