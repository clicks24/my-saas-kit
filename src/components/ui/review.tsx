import { Star } from "lucide-react";
import { Heading } from "./typography";

export function Review({ review, by }: { review: string; by: string }) {
  return (
    <div className="rounded border border-border p-8">
      <div className="flex flex-col">
        <Heading className="font-normal text-base">{by}</Heading>
        <p className="text-sm text-muted py-4">{review}</p>
        <div className="flex items-center gap-1">
          <Star size={16} stroke="rgb(251 191 36)" fill="rgb(251 191 36)" />
          <Star size={16} stroke="rgb(251 191 36)" fill="rgb(251 191 36)" />
          <Star size={16} stroke="rgb(251 191 36)" fill="rgb(251 191 36)" />
          <Star size={16} stroke="rgb(251 191 36)" fill="rgb(251 191 36)" />
          <Star size={16} stroke="rgb(251 191 36)" fill="rgb(251 191 36)" />
        </div>
      </div>
    </div>
  );
}
