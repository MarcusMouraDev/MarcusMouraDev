import type { HTMLMotionProps } from "motion/react";
import type { PortfolioItem } from "../../data/portfolio";

export type RevealProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "whileInView" | "viewport" | "transition"
>;

export type CaseSelectHandler = (
  item: PortfolioItem,
  options?: {
    morph?: boolean;
  },
) => void;
