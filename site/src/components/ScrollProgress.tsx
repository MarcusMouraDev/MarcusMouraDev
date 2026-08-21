import { motion, useScroll, useTransform } from "motion/react";
import { useMotionEnabled } from "../motion";

const LINE_PATH =
  "M12 0 V7 C12 13 20 16 20 24 C20 32 4 36 4 46 C4 58 20 62 20 72 C20 82 12 86 12 93 V100";

export function ScrollProgress() {
  const enabled = useMotionEnabled();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], enabled ? [0, 1] : [0, 0]);
  const pathLength = useTransform(scrollYProgress, [0, 0.94], enabled ? [0, 1] : [1, 1]);

  return (
    <>
      {enabled ? <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" /> : null}
      <svg className="scroll-line" viewBox="0 0 24 100" preserveAspectRatio="none" aria-hidden="true">
        <path className="scroll-line__track" d={LINE_PATH} vectorEffect="non-scaling-stroke" />
        <motion.path
          className="scroll-line__draw"
          d={LINE_PATH}
          vectorEffect="non-scaling-stroke"
          style={{ pathLength }}
        />
      </svg>
    </>
  );
}
