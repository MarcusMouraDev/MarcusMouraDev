import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";

export type HoverTarget = {
  text: string;
  imageUrl: string;
  linkUrl?: string;
  altText?: string;
};

type HoverPreviewTwProps = {
  content?: string;
  targets: HoverTarget[];
  children?: ReactNode;
  className?: string;
  imagePosition?: "above" | "below";
  enterSpeed?: number;
  exitSpeed?: number;
  maxRotation?: number;
  maxOffset?: number;
  imageWidth?: number;
  imageHeight?: number;
  targetPadding?: number;
  imageBorderRadius?: number;
  showImageShadow?: boolean;
  showSymbol?: boolean;
  onTargetClick?: (target: HoverTarget, index: number) => void;
  "aria-label"?: string;
};

type PreviewState = {
  target: HoverTarget;
  index: number;
  x: number;
  y: number;
};

type HoverPreviewContextValue = {
  targets: HoverTarget[];
  imagePosition: "above" | "below";
  enterSpeed: number;
  exitSpeed: number;
  maxRotation: number;
  maxOffset: number;
  imageWidth: number;
  imageHeight: number;
  targetPadding?: number;
  imageBorderRadius: number;
  showImageShadow: boolean;
  showSymbol: boolean;
  reduceMotion: boolean;
  finePointer: boolean;
  activeIndex: number | null;
  show: (index: number, x: number, y: number) => void;
  hide: () => void;
  onTargetClick?: (target: HoverTarget, index: number) => void;
};

const HoverPreviewContext = createContext<HoverPreviewContextValue | null>(null);

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function parseContent(content: string, targets: HoverTarget[]) {
  const parts: Array<{ type: "text"; value: string } | { type: "target"; index: number }> = [];
  const matcher = /\{(\d+)\}/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = matcher.exec(content))) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: content.slice(lastIndex, match.index) });
    }
    const index = Number(match[1]);
    if (targets[index]) parts.push({ type: "target", index });
    lastIndex = matcher.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push({ type: "text", value: content.slice(lastIndex) });
  }

  return parts;
}

function previewOrigin(
  x: number,
  y: number,
  width: number,
  height: number,
  position: "above" | "below",
) {
  const gap = 16;
  const left = clamp(x - width / 2, 12, window.innerWidth - width - 12);
  const rawTop = position === "below" ? y + gap : y - height - gap;
  const top = clamp(rawTop, 12, window.innerHeight - height - 12);
  return { left, top };
}

export function HoverPreviewTw({
  content,
  targets,
  children,
  className,
  imagePosition = "above",
  enterSpeed = 0.18,
  exitSpeed = 0.16,
  maxRotation = 8,
  maxOffset = 18,
  imageWidth = 200,
  imageHeight = 200,
  targetPadding,
  imageBorderRadius = 2,
  showImageShadow = true,
  showSymbol = true,
  onTargetClick,
  "aria-label": ariaLabel,
}: HoverPreviewTwProps) {
  const reduceMotion = Boolean(useReducedMotion());
  const [finePointer, setFinePointer] = useState(false);
  const [canPortal, setCanPortal] = useState(false);
  const [preview, setPreview] = useState<PreviewState | null>(null);
  const hideTimerRef = useRef<number | null>(null);
  const rotate = useMotionValue(0);
  const offset = useMotionValue(0);
  const rotateSpring = useSpring(rotate, { stiffness: 220, damping: 22, mass: 0.6 });
  const offsetSpring = useSpring(offset, { stiffness: 220, damping: 22, mass: 0.6 });

  useEffect(() => {
    setCanPortal(true);
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setFinePointer(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    return () => {
      if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    };
  }, []);

  const show = useCallback((index: number, x: number, y: number) => {
    const target = targets[index];
    if (!target) return;
    if (hideTimerRef.current) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    setPreview({ target, index, x, y });
  }, [targets]);

  const hide = useCallback(() => {
    if (hideTimerRef.current) window.clearTimeout(hideTimerRef.current);
    hideTimerRef.current = window.setTimeout(() => setPreview(null), 60);
  }, []);

  const origin = preview
    ? previewOrigin(preview.x, preview.y, imageWidth, imageHeight, imagePosition)
    : null;

  const context = useMemo<HoverPreviewContextValue>(
    () => ({
      targets,
      imagePosition,
      enterSpeed,
      exitSpeed,
      maxRotation,
      maxOffset,
      imageWidth,
      imageHeight,
      targetPadding,
      imageBorderRadius,
      showImageShadow,
      showSymbol,
      reduceMotion,
      finePointer,
      activeIndex: preview?.index ?? null,
      show,
      hide,
      onTargetClick,
    }),
    [
      targets,
      imagePosition,
      enterSpeed,
      exitSpeed,
      maxRotation,
      maxOffset,
      imageWidth,
      imageHeight,
      targetPadding,
      imageBorderRadius,
      showImageShadow,
      showSymbol,
      reduceMotion,
      finePointer,
      preview?.index,
      show,
      hide,
      onTargetClick,
    ],
  );

  const parts = content ? parseContent(content, targets) : null;

  return (
    <HoverPreviewContext.Provider value={context}>
      <div
        className={["hover-preview-tw", className].filter(Boolean).join(" ")}
        role={ariaLabel ? "group" : undefined}
        aria-label={ariaLabel}
      >
        {parts ? (
          <div className="hover-preview-tw__copy">
            <p>
              {parts.map((part, index) =>
                part.type === "text" ? (
                  <span key={`text-${index}`}>{part.value}</span>
                ) : (
                  <HoverPreviewTarget key={`target-${part.index}`} index={part.index} />
                ),
              )}
            </p>
          </div>
        ) : (
          children
        )}
      </div>
      {canPortal
        ? createPortal(
            <AnimatePresence>
              {preview && origin ? (
                <motion.img
                  key={`${preview.target.imageUrl}-${preview.index}`}
                  className="hover-preview-tw__image"
                  src={preview.target.imageUrl}
                  alt=""
                  aria-hidden="true"
                  initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 8 }}
                  animate={reduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, y: 0 }}
                  exit={
                    reduceMotion
                      ? { opacity: 0, transition: { duration: exitSpeed } }
                      : {
                          opacity: 0,
                          scale: 0.95,
                          y: 6,
                          transition: { duration: exitSpeed, ease: [0.16, 1, 0.3, 1] },
                        }
                  }
                  transition={{
                    duration: enterSpeed,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    left: origin.left,
                    top: origin.top,
                    width: imageWidth,
                    height: imageHeight,
                    borderRadius: imageBorderRadius,
                    boxShadow: showImageShadow
                      ? "0 18px 40px rgb(16 18 20 / 0.16)"
                      : "none",
                    rotate: reduceMotion ? 0 : rotateSpring,
                    x: reduceMotion ? 0 : offsetSpring,
                  }}
                />
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </HoverPreviewContext.Provider>
  );
}

export function HoverPreviewTarget({
  index,
  className,
}: {
  index: number;
  className?: string;
}) {
  const context = useContext(HoverPreviewContext);
  if (!context) return null;
  const target = context.targets[index];
  if (!target) return null;

  const label = target.altText ?? target.text;
  const isActive = context.activeIndex === index;

  const revealFromEvent = (event: {
    currentTarget: EventTarget & HTMLButtonElement;
    clientX?: number;
    clientY?: number;
  }) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX ?? rect.left + rect.width / 2;
    const y = event.clientY ?? rect.top;
    context.show(index, x, context.imagePosition === "below" ? rect.bottom : y);
  };

  return (
    <button
      type="button"
      className={["hover-preview-tw__target", className].filter(Boolean).join(" ")}
      aria-label={label}
      aria-expanded={isActive}
      data-active={isActive ? "true" : undefined}
      style={context.targetPadding != null ? { padding: `${context.targetPadding}px` } : undefined}
      onPointerEnter={(event) => {
        if (!context.finePointer) return;
        revealFromEvent(event);
      }}
      onPointerMove={(event) => {
        if (!context.finePointer || context.reduceMotion) return;
        const rect = event.currentTarget.getBoundingClientRect();
        context.show(
          index,
          event.clientX,
          context.imagePosition === "below" ? rect.bottom : rect.top,
        );
      }}
      onPointerLeave={() => {
        if (context.finePointer) context.hide();
      }}
      onFocus={(event) => revealFromEvent(event)}
      onBlur={() => context.hide()}
      onClick={(event) => {
        if (context.onTargetClick) {
          context.onTargetClick(target, index);
          return;
        }
        if (target.linkUrl) {
          window.open(target.linkUrl, "_blank", "noreferrer");
          return;
        }
        if (!context.finePointer) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (isActive) context.hide();
          else {
            context.show(
              index,
              rect.left + rect.width / 2,
              context.imagePosition === "below" ? rect.bottom : rect.top,
            );
          }
        }
      }}
    >
      {context.showSymbol ? (
        <img className="hover-preview-tw__symbol" src={target.imageUrl} alt="" aria-hidden="true" />
      ) : null}
      {target.text}
    </button>
  );
}
