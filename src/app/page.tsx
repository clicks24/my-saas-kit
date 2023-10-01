import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { PricingTable } from "@/components/blocks/pricing/pricing-table";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import { Review } from "@/components/ui/review";
import { getCompletedPlans } from "@/lib/billing";
import {
  ArrowRight,
  ChevronRightCircle,
  Code2,
  CreditCard,
  Lock,
  Mail,
  Paintbrush,
  Server,
  Youtube,
  Zap,
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
      <TechStackHero />
      <div className="py-20 px-4" id="pricing">
        <PricingTable plans={plans} />
      </div>
      <SocialProofCTA />
      <Footer />
    </main>
  );
}

function Features() {
  return (
    <div className="max-w-4xl m-auto px-4 w-full py-20">
      <div className="grid sm:grid-cols-2 gap-8   ">
        <FeatureCard
          icon={<Lock size={16} />}
          feature="Authentication"
          description="Use any OAuth provider supported by next-auth."
        />
        <FeatureCard
          icon={<CreditCard size={16} />}
          feature="Subscriptions"
          description="Create monthly and yearly billing plans. Let users manage thier billing plan."
        />
        <FeatureCard
          icon={<Paintbrush size={16} />}
          feature="Fully customizable"
          description="Fully customizable component library using Tailwind."
        />
        <FeatureCard
          icon={<Mail size={16} />}
          feature="Mail templates"
          description="Create email templates using react-email."
        />
        <FeatureCard
          icon={<Server size={16} />}
          feature="Serverless architecture"
          description="Deploy painlessly using Vercel or any serverless provider."
        />
        <FeatureCard
          icon={<Code2 size={16} />}
          feature="Developer experience"
          description="Easy to use, clean code, expertly crafted."
        />
      </div>
    </div>
  );
}

function TechStackHero() {
  return (
    <div className="dark:bg-zinc-900/60 bg-gray-700 py-6">
      <div className="max-w-6xl m-auto px-4">
        <div className="grid sm:grid-cols-4 grid-cols-2 gap-8">
          <div className="grid place-items-center">
            <img
              src="/next.png"
              className="h-6 grayscale hover:grayscale-0 duration-150 opacity-60 hover:opacity-100"
            />
          </div>
          <div className="grid place-items-center">
            <img
              src="/stripe.png"
              className="h-14  grayscale hover:grayscale-0 duration-150 opacity-60 hover:opacity-100 "
            />
          </div>
          <div className="grid place-items-center">
            <img
              className="h-10  grayscale hover:grayscale-0 duration-150 opacity-60 hover:opacity-100"
              src="https://resend.com/static/brand/resend-wordmark-white.svg"
            />
          </div>
          <div className="grid place-items-center">
            <img
              className="h-10  grayscale hover:grayscale-0 duration-150 opacity-60 hover:opacity-100"
              src="/prisma.png"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SocialProofCTA() {
  return (
    <div className="flex flex-col w-full items-center py-28 dark:bg-zinc-900/60 bg-zinc-50">
      <div className="flex flex-col items-center px-4">
        <h1 className="text-2xl sm:text-4xl  text-center font-medium pb-4">
          Join 100+ developers already shipping
        </h1>
        <p className="text-center text-sm w-fit rounded-lg">
          {"Here's what developers are saying about us"}
        </p>
      </div>
      <div className="max-w-3xl m-auto px-4 w-full pt-20">
        <div className="flex justify-center w-full">
          <div className="grid sm:grid-cols-2 gap-12">
            <Review review="Wicked boilerplate keep us updated!" by="RSS" />
            <Review review="love the design and simplicity.." by="Stan" />
            <Review review="thrilled to have this" by="porkensteinxp" />
            <Review review="Works! exciting!" by="amorimcode" />
            <Review
              review="Happy to get to use this! This will save so much time for my company"
              by="Anonymous"
            />
            <Review review="Thank you, this will come in handy" by="noevisa" />
          </div>
        </div>

        <div className="flex justify-center py-20">
          <Link href={"https://saasplanet.org/#pricing"}>
            <Button size={"lg"} className="gap-2">
              <Zap fill="black" size={16} />
              Start Shipping
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="max-w-7xl m-auto px-4 min-h-[70vh] grid items-center ">
      <div className="flex flex-col items-center">
        <h1 className="text-center font-medium bg-gradient-to-r max-w-4xl dark:from-white dark:to-zinc-300 from-black to-zinc-700 bg-clip-text text-transparent text-4xl sm:text-5xl sm:leading-none lg:text-6xl">
          Build this weekend.
          <br />
          <span className="bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Ship on monday.
          </span>
        </h1>
        <p className="text-center py-6 text-sm sm:text-base lg:text-lg text-muted max-w-[60ch] opacity-80">
          The best NextJS kit for starting and scaling your software business.
        </p>
        <div className="flex items-center gap-4">
          <Link href={"/starter-kits"}>
            <Button className="gap-2" size={"lg"}>
              Get started
              <ArrowRight size={16} />
            </Button>
          </Link>
          <Link href={"https://www.youtube.com/watch?v=Q1L5rWcj8zg"}>
            <Button variant={"ghost"} className="gap-2" size={"lg"}>
              <Youtube size={16} />
              Video Walkthrough
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
