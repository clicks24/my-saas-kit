import { GradientBorder } from "./gradient-border";

export function FeatureCard({
  feature,
  description,
  icon,
}: {
  feature: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <GradientBorder>
      <div className="p-6 dark:bg-transparent bg-white">
        <div className="shrink-0 ">{icon}</div>
        <h3 className="py-3 font-medium text-lg">{feature}</h3>
        <p className="opacity-80 text-sm">{description}</p>
      </div>
    </GradientBorder>
  );
}
