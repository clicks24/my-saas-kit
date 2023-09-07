import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { PricingTable } from "@/components/blocks/pricing/pricing-table";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { getCompletedPlans } from "@/lib/billing";
import {
    ChevronRightCircle,
    Code2,
    CreditCard,
    Lock,
    Mail,
    Paintbrush,
    Server,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const plans = await getCompletedPlans();

  return (
    <main>
      <Header />
      <Hero />
      <div className={"relative z-10"}>
        <div className="max-w-7xl z-10 border border-white/30 m-auto p-4 sm:p-8 bg-white/20 w-full rounded-3xl">
          <img
            src="/assets/billing.png"
            className="rounded-xl bg-black p-4 z-10"
          ></img>
        </div>
        <div className="top-20 bottom-20 w-full bg-gradient-conic from-rose-500 via-violet-400 to-amber-500 absolute z-[-1]" />
      </div>
      <Features />
      <div className="py-20 px-4" id="pricing">
        <PricingTable plans={plans} />
      </div>
      <Footer />
    </main>
  );
}

function Features() {
  return (
    <div className="max-w-4xl m-auto px-4 w-full py-20">
      <div className="grid sm:grid-cols-2 gap-8">
        <div className="flex flex-col gap-8">
          <FeatureCard
            icon={<Lock size={16} />}
            feature="Authentication"
            description="Supports sign in with email, 40+ OAuth providers like Google, Github, ...etc. Let users manage thier profile and account."
          />
          <FeatureCard
            icon={<CreditCard size={16} />}
            feature="Subscriptions"
            description="Supports sign in with email, 40+ OAuth providers like Google, Github, ...etc. Let users manage thier profile and account."
          />
          <FeatureCard
            icon={<Paintbrush size={16} />}
            feature="Fully customizable"
            description="Supports sign in with email, 40+ OAuth providers like Google, Github, ...etc. Let users manage thier profile and account."
          />
        </div>
        <div className="flex flex-col gap-8">
          <FeatureCard
            icon={<Mail size={16} />}
            feature="Mail templates"
            description="Supports sign in with email, 40+ OAuth providers like Google, Github, ...etc. Let users manage thier profile and account."
          />
          <FeatureCard
            icon={<Server size={16} />}
            feature="Serverless architecture"
            description="Supports sign in with email, 40+ OAuth providers like Google, Github, ...etc. Let users manage thier profile and account."
          />
          <FeatureCard
            icon={<Code2 size={16} />}
            feature="Developer experience"
            description="Supports sign in with email, 40+ OAuth providers like Google, Github, ...etc. Let users manage thier profile and account."
          />
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="max-w-7xl m-auto px-4 min-h-[70vh] grid items-center ">
      <div className="flex flex-col items-center">
        <h1 className="text-center bg-gradient-to-r max-w-4xl dark:from-white dark:to-zinc-300 from-black to-zinc-700 bg-clip-text text-transparent text-4xl sm:text-5xl sm:leading-none lg:text-6xl">
          Build this weekend
          <br />
          <span className="bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Ship on monday
          </span>
        </h1>
        <p className="text-center py-6 text-sm sm:text-base lg:text-lg text-muted max-w-[60ch] opacity-80">
          Build whatever you want with this kit, we hope you enjoy.
        </p>
        <div className="flex items-center gap-4">
          <Link href={"/starter-kits"}>
            <Button className="rounded-full gap-2">
              Sign in
              <ChevronRightCircle size={16} />
            </Button>
          </Link>
          <Link href={"/templates"}>
            <Button variant={"ghost"} className="rounded-full gap-2">
              Setup guide
              <ChevronRightCircle size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
