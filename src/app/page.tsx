import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { PricingTable } from "@/components/blocks/pricing/pricing-table";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/ui/feature-card";
import Grid from "@/components/ui/grid";
import { Review } from "@/components/ui/review";
import { Heading } from "@/components/ui/typography";
import { getCompletedPlans } from "@/lib/billing";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  CreditCard,
  Lock,
  Mail,
  Paintbrush,
  Plus,
  Server,
} from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const plans = await getCompletedPlans();

  return (
    <main>
      <Header />
      <Hero />
      <TechStackHero />
      <Features />
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
    <div className="max-w-5xl m-auto px-4 w-full py-28" id="features">
      <div className="pb-20 flex flex-col items-center">
        <Heading className="text-4xl text-center ">{"What's included"}</Heading>
        <p className="mt-4 max-w-[30rem] text-center leading-7 text-base md:text-[1.125rem] md:leading-[1.5] text-muted font-normal">
          Login, payments, emails, dashboard, user settings and more available
          to you instantly.
        </p>
      </div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-8">
        <FeatureCard
          features={[
            "Send transactional emails",
            "Create custom emails using react-email",
            "Powered using Resend",
          ]}
          icon={<Mail size={16} />}
          title="Emails"
        />
        <FeatureCard
          features={[
            "Create custom pricing plans",
            "Customer portal",
            "Powered using Stripe",
          ]}
          icon={<CreditCard size={16} />}
          title="Payments"
        />
        <FeatureCard
          features={[
            "Magic links setup",
            "Login with Google, GitHub, Discord",
            "User data stored in your DB",
            "Secured pages and routes",
          ]}
          icon={<Lock size={16} />}
          title="Authentication"
        />
        <FeatureCard
          features={[
            "Pre-built component library",
            "100% customizable",
            "Built using ShadCN UI",
            "Tailwind",
          ]}
          icon={<Paintbrush size={16} />}
          title="Components"
        />
        <FeatureCard
          features={["MySQL, Mongo, Postgres", "Prisma ORM", "Schema included"]}
          icon={<Server size={16} />}
          title="Database"
        />
        <FeatureCard
          features={[
            "Admin dashboard",
            "Create and update pricing plans",
            "Blog using markdown",
            "File uploads",
          ]}
          icon={<Plus size={16} />}
          title="Extras"
        />
      </div>
    </div>
  );
}

function TechStackHero() {
  return (
    <div className="border-b border-border ">
      <div className="max-w-6xl m-auto px-4">
        <div className="grid md:grid-cols-4 grid-cols-2 gap-8 md:divide-x md:divide-border py-6">
          <div className="grid place-items-center">
            <img
              src="/next.png"
              className="h-5 grayscale hover:grayscale-0 duration-150 opacity-60 hover:opacity-100 invert"
            />
          </div>
          <div className="grid place-items-center">
            <img
              src="/stripe.png"
              className="h-8  grayscale hover:grayscale-0 duration-150 opacity-60 hover:opacity-100 invert "
            />
          </div>
          <div className="grid place-items-center">
            <img
              className="h-8  grayscale hover:grayscale-0 duration-150 opacity-60 hover:opacity-100 invert"
              src="https://resend.com/static/brand/resend-wordmark-white.svg"
            />
          </div>
          <div className="grid place-items-center">
            <img
              className="h-8  grayscale hover:grayscale-0 duration-150 opacity-60 hover:opacity-100 invert"
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
      <div className="flex flex-col items-center">
        <Heading className="text-4xl text-center ">{"Join developers already shipping"}</Heading>
        <p className="mt-4 max-w-[30rem] text-center leading-7 text-base md:text-[1.125rem] md:leading-[1.5] text-muted font-normal">
         Hundreds of developers are already shipping products, join them today!
        </p>
      </div>
      </div>
      <div className="max-w-3xl m-auto px-4 w-full pt-20">
        <div className="flex justify-center w-full">
          <div className="grid sm:grid-cols-2 gap-8">
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
              Start Shipping
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="bg-[url('/grid.svg')]  bg-center border-b border-border">
      <div className="max-w-6xl mx-auto w-full relative py-12 px-4    ">
        <div className="flex flex-col items-start sm:items-start gap-2 relative max-w-4xl mx-auto   sm:py-20 py-12 ">
          <div className="flex flex-col items-center  w-full">
            <Heading
              className={cn(
                " px-4 text-center text-[3rem] md:text-[4rem] leading-[4.35rem] md:leading-[5rem] tracking-tight text-primary"
              )}
            >
              Your fastest path to shipping
            </Heading>
            <p className=" mb-8 mt-4 max-w-[30rem] px-4 text-center leading-7 text-base md:text-[1.125rem] md:leading-[1.5] text-muted font-normal">
              The best NextJS kit for starting and scaling your software
              business.
            </p>

            <Link href="/auth/sign-in" className="w-fit px-4">
              <Button size="lg">Get started</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
