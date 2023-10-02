import { Star } from "lucide-react";
import { GradientBorder } from "./gradient-border";

export function Review({ review, by }: { review: string; by: string }) {
  return (
    <div className="rounded-md dark:border-space-light border-space-light border">
      <div className="flex flex-col">
        <div className="flex flex-row justify-between items-center px-4 py-4">
          <p className="text-sm font-medium">{by}</p>
          <div className="flex items-center gap-1">
            <Star size={16} stroke="rgb(251 191 36)" fill="rgb(251 191 36)" />
            <Star size={16} stroke="rgb(251 191 36)" fill="rgb(251 191 36)" />
            <Star size={16} stroke="rgb(251 191 36)" fill="rgb(251 191 36)" />
            <Star size={16} stroke="rgb(251 191 36)" fill="rgb(251 191 36)" />
            <Star size={16} stroke="rgb(251 191 36)" fill="rgb(251 191 36)" />
          </div>
        </div>
        <p className="text-sm px-4 pb-4 italic">{review}</p>
      </div>
    </div>
  );
}
