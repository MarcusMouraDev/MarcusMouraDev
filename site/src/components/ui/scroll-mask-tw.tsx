import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

type ScrollMaskVariant = "iris" | "wipe" | "curtain";
type ScrollMaskMode = "pin" | "reveal";

type ScrollMaskTwProps = {
  variant?: ScrollMaskVariant;
  mode?: ScrollMaskMode;
  scrollLength?: number;
  settle?: number;
  smooth?: number;
  background?: string;
  revealContent?: boolean;
  ariaLabel?: string;
  className?: string;
  children?: ReactNode;
};

export function ScrollMaskTw({
  variant = "iris",
  mode = "reveal",
  scrollLength = 0.7,
  settle = 0.84,
  smooth = 0.14,
  background = "#f3f4f1",
  revealContent = false,
  ariaLabel = "Abertura",
  className = "",
  children,
}: ScrollMaskTwProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: mode === "pin" ? ["start start", "end start"] : ["start 0.92", "center 0.42"],
  });

  const eased = useSpring(scrollYProgress, {
    stiffness: smooth > 0 ? 120 : 1000,
    damping: smooth > 0 ? 28 : 100,
    mass: 0.35,
  });

  const open = useTransform(eased, [0, settle, 1], [0, 1, 1]);
  const contentOpacity = useTransform(open, [0.72, 1], revealContent ? [0, 1] : [1, 1]);
  const irisClip = useTransform(open, (value) => `circle(${Math.max(value * 150, 0)}% at 50% 52%)`);
  const wipeClip = useTransform(open, (value) => `inset(0 ${Math.max(100 - value * 100, 0)}% 0 0)`);
  const curtainClip = useTransform(open, (value) => `inset(${Math.max(100 - value * 100, 0)}% 0 0 0)`);

  const clipPath = reduceMotion
    ? "inset(0% 0 0 0)"
    : variant === "wipe"
      ? wipeClip
      : variant === "curtain"
        ? curtainClip
        : irisClip;

  const frame = (
    <motion.div
      className="scroll-mask-tw__frame"
      style={{
        background,
        clipPath: reduceMotion ? "inset(0% 0 0 0)" : clipPath,
      }}
    >
      <motion.div className="scroll-mask-tw__content" style={{ opacity: reduceMotion ? 1 : contentOpacity }}>
        {children}
      </motion.div>
    </motion.div>
  );

  return (
    <section
      ref={sectionRef}
      className={`scroll-mask-tw scroll-mask-tw--${variant} scroll-mask-tw--${mode} ${className}`.trim()}
      style={
        mode === "pin"
          ? { ["--scroll-mask-runway" as string]: `${Math.round(scrollLength * 100)}vh` }
          : undefined
      }
      aria-label={ariaLabel}
    >
      {mode === "pin" ? <div className="scroll-mask-tw__pin">{frame}</div> : frame}
    </section>
  );
}
