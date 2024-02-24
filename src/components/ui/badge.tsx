import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded border border-border px-2 py-0.5 text-xs tracking-tight font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-zinc-950 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "bg-container border border-border text-muted",
        secondary: "border-transparent bg-zinc-100 text-zinc-900 ",
        rainbow:
          "border-transparent bg-gradient-to-r from-amber-300 to-rose-300 text-zinc-900 ",
        destructive:
          "border-critical bg-critical text-white hover:bg-red-500/80 ",
        outline: "text-zinc-950",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
