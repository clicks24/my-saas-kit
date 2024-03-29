import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center tracking-tight shadow-sm active:scale-[.98] active:opacity-90 relative transition-all justify-center ease-in-out gap-2 duration-150 rounded-md text-sm font-medium hover:shadow ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ",
  {
    variants: {
      variant: {
        default: "bg-primary text-white",
        cta: "bg-brand text-white ring-2",
        secondary: "bg-container text-primary border-container border ",
        destructive: "bg-critical text-white hover:bg-critical/90",
        outline:
          "border border-border bg-surface text-primary hover:bg-container",
        ghost: "text-primary hover:bg-container shadow-none hover:shadow-none ",
        link: "text-primary shadow-none hover:shadow-none",
      },
      size: {
        default: "h-8 px-3",
        sm: "h-7 px-2 text-xs",
        lg: "h-10 px-4 text-base",
        icon: "w-8 h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }), {
          "opacity-50": loading,
        })}
        ref={ref}
        {...props}
      >
        {props.children}
        {loading && (
          <div className="absolute grid place-items-center w-full h-full text-primary rounded-xl">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="animate-spin"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
          </div>
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
