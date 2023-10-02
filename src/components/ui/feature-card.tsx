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
    <div className="opacity-80">{icon}</div>
    <p className="font-medium text-lg py-4">{title}</p>
    <div className="flex flex-col gap-2">
      {features.map((item, index) => (
        <div
          className="text-sm flex items-center gap-2"
          key={index}
        >
          <Check className="opacity-80 font-semibold" size={16} />
          <p>{item}</p>
        </div>
      ))}
    </div>
  </div>
  );
}
