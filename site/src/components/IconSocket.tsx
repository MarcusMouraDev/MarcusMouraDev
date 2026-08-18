import type { ComponentType } from "react";

type IconProps = {
  width?: number | string;
  height?: number | string;
  strokeWidth?: number;
  "aria-hidden"?: boolean;
};

type IconSocketProps = {
  icon: ComponentType<IconProps>;
  accent?: "coral" | "cobalt" | "aqua" | "green";
  size?: "small" | "large";
};

export function IconSocket({
  icon: Icon,
  accent = "cobalt",
  size = "small",
}: IconSocketProps) {
  return (
    <span className={`icon-socket icon-socket--${size}`} aria-hidden="true">
      <Icon width="100%" height="100%" strokeWidth={1.7} aria-hidden />
      <span className={`icon-node icon-node--${accent}`} />
    </span>
  );
}
