import { Check } from "lucide-react";
import { GradientBorder } from "./gradient-border";

export function FeatureCard({
  icon,
  title,
  features,
}: {
  icon: React.ReactNode;
  title: string;
  features: string[];
}) {
  return (
    <div className="flex flex-col">
    <div className="w-8 h-8 grid place-items-center ring-2 rounded bg-focus text-white shrink-0">{icon}</div>
    <p className="font-medium text-lg py-4">{title}</p>
    <div className="flex flex-col gap-2">
      {features.map((item, index) => (
        <div
          className="text-sm flex items-center gap-2"
          key={index}
        >
          <Check className="text-muted font-semibold shrink-0" size={16} />
          <p className="tracking-tight">{item}</p>
        </div>
      ))}
    </div>
  </div>
  );
}
