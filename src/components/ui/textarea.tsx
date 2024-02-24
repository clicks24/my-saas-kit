import * as React from "react";

import { cn } from "@/lib/utils";
import { defaultInputStyles } from "./defaults";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex resize-none min-h-10 w-full rounded-md  text-[14px] bg-white border-border border shadow px-3 py-2  ring-offset-white file:border-0 file:bg-transparent file:text-base file:font-medium placeholder:text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950  disabled:cursor-not-allowed disabled:opacity-50 ",
          className,
          defaultInputStyles
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
