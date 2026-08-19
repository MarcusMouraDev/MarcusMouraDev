import type { HTMLMotionProps } from "motion/react";
import type { PortfolioItem } from "../../data/portfolio";

export type Theme = "light" | "dark";

export type RevealProps = Pick<
  HTMLMotionProps<"div">,
  "initial" | "whileInView" | "viewport" | "transition"
>;

export type CaseSelectHandler = (item: PortfolioItem) => void;
