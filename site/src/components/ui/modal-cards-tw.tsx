import { AnimatePresence, LayoutGroup, motion, useReducedMotion, type Transition } from "motion/react";
import { useCallback, useEffect, useRef, type ReactNode } from "react";
import { Xmark } from "iconoir-react";

export type ModalCardData = {
  id: string;
  imageUrl?: string;
  title: string;
  description: string;
  gradientColor?: string;
};

type AnimationSpeed = "slow" | "normal" | "fast" | "none";
type AnimationVariant = "scale" | "fade" | "slide";

type ModalCardsTwProps = {
  cards?: ModalCardData[];
  selectedId?: string | null;
  onSelectedIdChange?: (id: string | null) => void;
  className?: string;
  gradientColor?: string;
  animationSpeed?: AnimationSpeed;
  springStiffness?: number;
  springDamping?: number;
  animationVariant?: AnimationVariant;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
  showCloseButton?: boolean;
  ariaLabel?: string;
  backdropGradientPosition?: string;
  modalClassName?: string;
  backdropClassName?: string;
  children?: ReactNode;
  renderModal?: (card: ModalCardData, close: () => void) => ReactNode;
};

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ");

export function modalCardLayoutId(
  id: string,
  part: "shell" | "title" | "desc" | "media" = "shell",
) {
  return `modal-card-${part}-${id}`;
}

function getSpring(
  speed: AnimationSpeed,
  stiffness?: number,
  damping?: number,
  reduceMotion?: boolean | null,
): Transition {
  if (reduceMotion || speed === "none") {
    return { duration: 0.01 };
  }

  const presets = {
    slow: { stiffness: 220, damping: 32 },
    normal: { stiffness: 320, damping: 28 },
    fast: { stiffness: 420, damping: 34 },
    none: { stiffness: 1000, damping: 100 },
  } as const;

  return {
    type: "spring",
    stiffness: stiffness ?? presets[speed].stiffness,
    damping: damping ?? presets[speed].damping,
  };
}

function getMotionState(
  variant: AnimationVariant,
  phase: "initial" | "animate" | "exit",
  reduceMotion?: boolean | null,
) {
  if (reduceMotion) {
    return phase === "initial" ? { opacity: 0 } : { opacity: 1 };
  }

  if (variant === "fade") {
    if (phase === "initial") return { opacity: 0 };
    if (phase === "exit") return { opacity: 0 };
    return { opacity: 1 };
  }

  if (variant === "slide") {
    if (phase === "initial") return { opacity: 0, y: 28 };
    if (phase === "exit") return { opacity: 0, y: 18 };
    return { opacity: 1, y: 0 };
  }

  if (phase === "initial") return { opacity: 0, scale: 0.985 };
  if (phase === "exit") return { opacity: 0, scale: 0.99 };
  return { opacity: 1, scale: 1 };
}

function getFocusable(root: HTMLElement) {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)).filter((node) => {
    if (node.hasAttribute("disabled") || node.getAttribute("aria-hidden") === "true") return false;
    return node.getClientRects().length > 0;
  });
}

export function ModalCardsTw({
  cards = [],
  selectedId = null,
  onSelectedIdChange,
  className = "",
  gradientColor = "#0b46ef",
  animationSpeed = "normal",
  springStiffness,
  springDamping,
  animationVariant = "scale",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true,
  ariaLabel = "Detalhes do projeto",
  backdropGradientPosition = "50% 10%",
  modalClassName = "",
  backdropClassName = "",
  children,
  renderModal,
}: ModalCardsTwProps) {
  const reduceMotion = useReducedMotion();
  const dialogRef = useRef<HTMLElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);
  const activeCard = cards.find((card) => card.id === selectedId) ?? null;
  const useLayoutMorph = animationVariant === "scale" && !reduceMotion;
  const dialogLabelId = activeCard ? `modal-title-${activeCard.id}` : undefined;

  const close = useCallback(() => onSelectedIdChange?.(null), [onSelectedIdChange]);

  useEffect(() => {
    if (!closeOnEscape || !activeCard) return undefined;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeCard, close, closeOnEscape]);

  useEffect(() => {
    if (!activeCard) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [activeCard]);

  useEffect(() => {
    if (!activeCard) return undefined;

    restoreFocusRef.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const dialog = dialogRef.current;
    const focusClose = () => {
      closeButtonRef.current?.focus();
    };
    const frame = window.requestAnimationFrame(focusClose);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialog) return;
      const nodes = getFocusable(dialog);
      if (nodes.length === 0) {
        event.preventDefault();
        return;
      }
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog?.addEventListener("keydown", onKeyDown);
    return () => {
      window.cancelAnimationFrame(frame);
      dialog?.removeEventListener("keydown", onKeyDown);
      restoreFocusRef.current?.focus();
    };
  }, [activeCard?.id]);

  const spring = getSpring(animationSpeed, springStiffness, springDamping, reduceMotion);

  return (
    <LayoutGroup id="modal-cards-tw">
      <div className={`modal-cards-tw ${className}`.trim()}>
        <div
          className="modal-cards-tw__page"
          inert={activeCard ? true : undefined}
          aria-hidden={activeCard ? true : undefined}
        >
          {children}
        </div>
      </div>
      <AnimatePresence mode="wait">
          {activeCard ? (
            <motion.div
              key={activeCard.id}
              className="modal-cards-tw__layer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0.01 : 0.18 }}
            >
              <motion.button
                type="button"
                className={`modal-cards-tw__backdrop ${backdropClassName}`.trim()}
                tabIndex={-1}
                aria-label="Fechar detalhes"
                onClick={closeOnBackdropClick ? close : undefined}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.22 }}
                style={{
                  ["--modal-backdrop-gradient" as string]: activeCard.gradientColor ?? gradientColor,
                  ["--modal-backdrop-gradient-pos" as string]: backdropGradientPosition,
                }}
              />
              <div className="modal-cards-tw__viewport">
                <motion.article
                  ref={dialogRef}
                  className={`modal-cards-tw__modal case-dialog ${modalClassName}`.trim()}
                  role="dialog"
                  aria-modal="true"
                  aria-label={dialogLabelId ? undefined : ariaLabel}
                  aria-labelledby={dialogLabelId}
                  layoutId={
                    useLayoutMorph ? modalCardLayoutId(activeCard.id, "shell") : undefined
                  }
                  initial={
                    useLayoutMorph ? false : getMotionState(animationVariant, "initial", reduceMotion)
                  }
                  animate={
                    useLayoutMorph ? undefined : getMotionState(animationVariant, "animate", reduceMotion)
                  }
                  exit={getMotionState(animationVariant, "exit", reduceMotion)}
                  transition={spring}
                  style={{
                    ["--modal-card-accent" as string]: activeCard.gradientColor ?? gradientColor,
                  }}
                >
                  {showCloseButton ? (
                    <button
                      ref={closeButtonRef}
                      type="button"
                      className="icon-button modal-cards-tw__close"
                      onClick={close}
                      aria-label="Fechar detalhes do projeto"
                    >
                      <Xmark width={22} height={22} strokeWidth={1.8} aria-hidden />
                    </button>
                  ) : null}
                  {renderModal ? (
                    renderModal(activeCard, close)
                  ) : (
                    <div className="modal-cards-tw__default">
                      <h2 id={`modal-title-${activeCard.id}`}>{activeCard.title}</h2>
                      <p>{activeCard.description}</p>
                    </div>
                  )}
                </motion.article>
              </div>
            </motion.div>
          ) : null}
      </AnimatePresence>
    </LayoutGroup>
  );
}
