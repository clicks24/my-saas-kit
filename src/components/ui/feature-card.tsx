import { GradientBorder } from "./gradient-border";


export function FeatureCard({ feature, description, icon }: { feature: string; description: string; icon: React.ReactNode}){
    return (
        <GradientBorder>
            <div className="p-6 dark:bg-transparent bg-white ">
                <div className="shrink-0 w-10 h-10 rounded-full grid place-items-center dark:border-zinc-800 border-zinc-200 border">
                    {icon}
                </div>
                <h3 className="py-3 font-normal text-lg">{feature}</h3>
                <p className="opacity-80 text-sm">{description}</p>
            </div>
        </GradientBorder>
    )
}