import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const alertVariants = cva(
  "relative w-full rounded-lg p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-zinc-950 dark:border-zinc-800 dark:[&>svg]:text-zinc-50",
  {
    variants: {
      variant: {
        default: "bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50",
        destructive:
          "border-red/50 dark:bg-rose-400/10 bg-rose-400/10 text-rose-500 dark:border-rose-500 [&>svg]:text-rose-500 dark:border-rose-900/50 dark:text-rose-600 dark:dark:border-rose-900 dark:[&>svg]:text-rose-600",
        success:
          "dark:bg-emerald-400/10 bg-emerald-400/10 text-black [&>svg]:text-emerald-100  dark:text-white dark:[&>svg]:text-emerald-900",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const Alert = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants>
>(({ className, variant, ...props }, ref) => (
  <div
    ref={ref}
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
));
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertTitle, AlertDescription };
