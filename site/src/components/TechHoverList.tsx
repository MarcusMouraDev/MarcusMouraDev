import { HoverPreviewTw } from "./ui/hover-preview-tw";
import { techHoverTargets, techInlineContent } from "../data/techPreviews";

type TechHoverListProps = {
  labels: string[];
  className?: string;
  label: string;
  imagePosition?: "above" | "below";
};

export function TechHoverList({
  labels,
  className,
  label,
  imagePosition = "above",
}: TechHoverListProps) {
  return (
    <HoverPreviewTw
      className={className}
      content={techInlineContent(labels)}
      targets={techHoverTargets(labels)}
      imagePosition={imagePosition}
      aria-label={label}
    />
  );
}
