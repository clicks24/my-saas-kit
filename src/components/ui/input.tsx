import * as React from "react";

import { defaultInputStyles } from "./defaults";
import { VariantProps, cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const inputVariants = cva(
  "flex h-9 w-full text-[14px] rounded-md focus:shadow ease-in-out transition-shadow duration-150 focus:border-secondary bg-surface border border-border px-3 py-2  ring-offset-white file:border-0 file:bg-transparent  file:text-base file:font-medium placeholder:text-muted  disabled:cursor-not-allowed disabled:opacity-50  ",
  {
    variants: {
      variant: {
        default: "h-8",
        sm: "h-7",
        lg: "h-10",
        xl: "h-12",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  children?: any;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          inputVariants({ variant, className }),
          defaultInputStyles
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
