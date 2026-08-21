import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";

type PreloaderVariant = "stairs" | "percentage" | "circle" | "slide" | "curtain";

type PreloaderTwProps = {
  loading?: boolean;
  variant?: PreloaderVariant;
  duration?: number;
  loadingText?: string;
  bgColor?: string;
  stairCount?: number;
  respectReducedMotion?: boolean;
  showProgress?: boolean;
  zIndex?: number;
  className?: string;
  children?: ReactNode;
  onComplete?: () => void;
};

export function PreloaderTw({
  loading = true,
  variant = "stairs",
  duration = 5200,
  loadingText = "carregando a magia...",
  bgColor = "#f3f4f1",
  stairCount = 10,
  respectReducedMotion = true,
  showProgress = false,
  zIndex,
  className = "",
  children,
  onComplete,
}: PreloaderTwProps) {
  const reduceMotion = useReducedMotion();
  const motionAllowed = !respectReducedMotion || !reduceMotion;
  const [active, setActive] = useState(loading);
  const [progress, setProgress] = useState(0);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!loading) {
      setActive(false);
      return undefined;
    }

    setActive(true);
    setProgress(0);

    if (!motionAllowed) {
      setProgress(100);
      const id = window.setTimeout(() => {
        setActive(false);
        onCompleteRef.current?.();
      }, 160);
      return () => window.clearTimeout(id);
    }

    const started = performance.now();
    let frame = 0;
    let finishTimer = 0;
    const tick = (now: number) => {
      const next = Math.min(100, ((now - started) / duration) * 100);
      setProgress(next);
      if (next < 100) {
        frame = window.requestAnimationFrame(tick);
        return;
      }

      finishTimer = window.setTimeout(() => {
        setActive(false);
        onCompleteRef.current?.();
      }, 280);
    };

    frame = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(finishTimer);
    };
  }, [duration, loading, motionAllowed]);

  useEffect(() => {
    if (!active) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);

  const stairs = useMemo(
    () => Array.from({ length: stairCount }, (_, index) => index),
    [stairCount],
  );

  if (!active && !loading) {
    return <>{children}</>;
  }

  return (
    <>
      {active ? (
        <div
          className={`preloader-tw preloader-tw--${variant} ${className}`.trim()}
          style={{ backgroundColor: bgColor, zIndex }}
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          {variant === "stairs" ? (
            <div className="preloader-tw__stairs" aria-hidden="true">
              {stairs.map((step) => (
                <motion.span
                  key={step}
                  className="preloader-tw__stair"
                  initial={{ y: 0 }}
                  animate={{ y: progress >= 90 ? "-110%" : 0 }}
                  transition={{
                    duration: 0.45,
                    delay: (step / stairCount) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              ))}
            </div>
          ) : null}
          <div className="preloader-tw__copy">
            <span className="preloader-tw__mascot" aria-hidden="true" />
            <p className="preloader-tw__label">{loadingText}</p>
            {showProgress ? <p className="preloader-tw__progress">{Math.round(progress)}</p> : null}
          </div>
        </div>
      ) : null}
      {!active ? children : null}
    </>
  );
}
