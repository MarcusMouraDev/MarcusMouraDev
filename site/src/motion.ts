import type { HTMLMotionProps } from "motion/react";
import { useReducedMotion } from "motion/react";

export const FLOW_EASE = [0.22, 1, 0.36, 1] as const;
export const STAGGER_SECONDS = 0.04;
export const STAGGER_CAP = 8;

export type StaggerMotion = Pick<
  HTMLMotionProps<"div">,
  "initial" | "animate" | "whileInView" | "viewport" | "transition" | "exit"
>;

function delayFor(index: number, extraDelay = 0) {
  return extraDelay + Math.min(index, STAGGER_CAP - 1) * STAGGER_SECONDS;
}

export function useMotionEnabled() {
  return !useReducedMotion();
}

export function useStagger() {
  const enabled = useMotionEnabled();

  return (index: number, extraDelay = 0, distance = 8): StaggerMotion => {
    if (!enabled) return {};
    return {
      initial: { opacity: 0, transform: `translateY(${distance}px)` },
      whileInView: { opacity: 1, transform: "translateY(0px)" },
      viewport: { once: true, amount: 0.18 },
      transition: { duration: 0.32, delay: delayFor(index, extraDelay), ease: FLOW_EASE },
    };
  };
}

export function useMountStagger() {
  const enabled = useMotionEnabled();

  return (index: number, extraDelay = 0, distance = 8): StaggerMotion => {
    if (!enabled) return {};
    return {
      initial: { opacity: 0, transform: `translateY(${distance}px)` },
      animate: { opacity: 1, transform: "translateY(0px)" },
      transition: { duration: 0.25, delay: delayFor(index, extraDelay), ease: FLOW_EASE },
    };
  };
}

export function useRevealOnce(): StaggerMotion {
  const enabled = useMotionEnabled();
  if (!enabled) return {};
  return {
    initial: { opacity: 0, transform: "translateY(16px)" },
    whileInView: { opacity: 1, transform: "translateY(0px)" },
    viewport: { once: true, amount: 0.12 },
    transition: { duration: 0.35, ease: FLOW_EASE },
  };
}

export function archiveRowMotion(index: number, enabled: boolean): StaggerMotion {
  if (!enabled) {
    return {
      initial: false,
      animate: { opacity: 1, transform: "translateY(0px)" },
      exit: { opacity: 0, transition: { duration: 0 } },
    };
  }
  return {
    initial: { opacity: 0, transform: "translateY(8px)" },
    animate: { opacity: 1, transform: "translateY(0px)" },
    exit: { opacity: 0, transition: { duration: 0.15, ease: FLOW_EASE } },
    transition: { duration: 0.25, delay: delayFor(index), ease: FLOW_EASE },
  };
}
