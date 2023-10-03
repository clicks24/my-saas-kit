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
  Hourglass,
  Lock,
  Mail,
  Paintbrush,
  Plus,
  Server,
  Tag,
  Youtube,
  Zap,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const plans = await getCompletedPlans();

  return (
    <main className="dark:bg-space-dark">
      <Header />
      <Hero />
      <TechStackHero />
      <Features />
      <div className="py-20 px-4 bg-space-light" id="pricing">
        <PricingTable plans={plans} />
      </div>
      <SocialProofCTA />
      <Footer />
    </main>
  );
}

function Features() {
  return (
    <div className="max-w-5xl m-auto px-4 w-full py-28" id="features">
      <div className="pb-20 flex flex-col items-center">
        <div className="rounded-full px-4 py-1 border light:border-white/20 dark:border-space-light font-medium text-sm w-fit flex items-center gap-4">
          <p>Save 100+ hours of development time</p>
        </div>
        <p className="sm:text-4xl text-center text-2xl py-6 font-medium">
          Build, ship, and make money quicker
        </p>
        <p className="sm:text-lg max-w-[60ch] opacity-80 text-center">
          Login, payments, emails, dashboard, user settings and more available
          to you instantly. Build off our boilerplate and spend more time
          building your startup.
        </p>
      </div>
      <div className="grid sm:grid-cols-3 grid-cols-1 sm:gap-12 gap-14">
        <FeatureCard
          features={[
            "Send transactional emails",
            "Create custom emails using react-email",
            "Powered using Resend",
          ]}
          icon={<Mail />}
          title="Emails"
        />
        <FeatureCard
          features={[
            "Create custom pricing plans",
            "Customer portal",
            "Powered using Stripe",
          ]}
          icon={<CreditCard />}
          title="Payments"
        />
        <FeatureCard
          features={[
            "Magic links setup",
            "Login with Google, GitHub, Discord",
            "User data stored in your DB",
            "Secured pages and routes",
          ]}
          icon={<Lock />}
          title="Authentication"
        />
        <FeatureCard
          features={[
            "Pre-built component library",
            "100% customizable",
            "Built using ShadCN UI",
            "Tailwind",
          ]}
          icon={<Paintbrush />}
          title="Components"
        />
        <FeatureCard
          features={["MySQL, Mongo, Postgres", "Prisma ORM", "Schema included"]}
          icon={<Server />}
          title="Database"
        />
        <FeatureCard
          features={[
            "Admin dashboard",
            "Create and update pricing plans",
            "Blog using markdown",
            "File uploads",
          ]}
          icon={<Plus />}
          title="Extras"
        />
      </div>
    </div>
  );
}

function TechStackHero() {
  return (
    <div className="bg-space-light py-6">
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
              className="h-10  grayscale hover:grayscale-0 duration-150 opacity-60 hover:opacity-100 "
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

function SocialProofCTA() {
  return (
    <div className="flex flex-col w-full items-center py-28">
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
    <div className="grid sm:grid-cols-2 items-center min-h-[calc(100vh-4rem)] max-w-[2000px] m-auto">
      <div className="flex flex-col px-10">
        <Link
          href="#"
          className="rounded-full px-4 py-1 border light:border-white/20 dark:border-space-light font-medium text-sm w-fit flex items-center gap-4"
        >
          <p>Checkout our updated pricing</p>
          <ArrowRight size={18} />
        </Link>
        <h1 className="py-8 font-normal bg-gradient-to-r max-w-4xl dark:from-white dark:to-zinc-300 from-black to-zinc-700 bg-clip-text text-transparent text-4xl sm:text-5xl sm:leading-none lg:text-6xl">
          Build this weekend.
          <br />
          <span className="bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Ship on monday.
          </span>
        </h1>
        <p className="pb-8 text-sm sm:text-base lg:text-lg max-w-[60ch] opacity-80">
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
      <div className="pl-8 pt-8 bg-space-light rounded-l-2xl">
        <div className=" pl-4 pt-4 bg-black rounded-tl-xl ">
          <img className="" src="/assets/dashboard.png" />
        </div>
      </div>
    </div>
  );
}
