import { cn } from "@/lib/utils";
import { PlusIcon } from "lucide-react";

export default function Grid({
  className,
  children,
}: {
  className: any;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn("border border-dashed border-border dark:border-dark-border relative", className)}
    >
      <PlusIcon
        strokeWidth={1}
        className="absolute h-6 w-6 -top-3 -left-3 text-muted z-[1000]"
      />
      <PlusIcon
        strokeWidth={1}
        className="absolute h-6 w-6 -bottom-3 -left-3 text-muted z-[1000]"
      />
      <PlusIcon
        strokeWidth={1}
        className="absolute h-6 w-6 -top-3 -right-3 text-muted z-[1000]"
      />
      <PlusIcon
        strokeWidth={1}
        className="absolute h-6 w-6 -bottom-3 -right-3 text-muted z-[1000]"
      />
      {children}
    </div>
  );
}
