import { cva } from "class-variance-authority";

export type TextIntentType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p1"
  | "p2";
export type TextVariantType =
  | "normal"
  | "accent"
  | "dim"
  | "inverted"
  | "error"
  | "success"
  | "warning"
  | "info";
export interface TextProps {
  children: React.ReactNode;
  className?: string;
  intent?: TextIntentType;
  variant?: TextVariantType;
}

const text = cva("", {
  variants: {
    intent: {
      h1: ["text-[64px]", "font-bold"],
      h2: ["text-[48px]", "font-semibold"],
      h3: ["text-[32px]", "font-bold"],
      h4: ["text-[24px]", "font-bold"],
      h5: ["text-[20px]", "font-medium"],
      h6: ["text-[18px]", "font-medium"],
      p1: ["text-[16px]", "", "", ""],
      p2: ["text-[14px]", "", "", ""],
    },
    variant: {
      normal: ["text-foreground"],
      accent: ["text-primary"],
      dim: ["text-muted-foreground"],
      dimmer: ["text-muted"],
      inverted: ["text-surface"],
      error: ["text-status-error"],
      success: ["text-status-success"],
      warning: ["text-status-warning"],
      info: ["text-status-info"],
    },
  },
  compoundVariants: [{ intent: "p1", variant: "normal", class: "" }],
});

export const Text = ({
  children,
  className,
  intent = "p1",
  variant = "normal",
}: TextProps) => {
  return (
    <span className={text({ intent, variant, className })}>{children}</span>
  );
};
