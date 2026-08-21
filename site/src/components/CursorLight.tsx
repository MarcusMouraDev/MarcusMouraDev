import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useMotionEnabled } from "../motion";

export function CursorLight() {
  const enabled = useMotionEnabled();
  const x = useMotionValue(-480);
  const y = useMotionValue(-480);
  const springX = useSpring(x, { stiffness: 160, damping: 24, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 160, damping: 24, mass: 0.35 });
  const [finePointer, setFinePointer] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (!enabled || !finePointer) return undefined;
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, finePointer, x, y]);

  if (!enabled || !finePointer) return null;

  return (
    <motion.div
      className="cursor-light"
      aria-hidden="true"
      style={{ translateX: springX, translateY: springY }}
    />
  );
}
