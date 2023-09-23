import { Button } from "@/components/ui/button";
import { ChevronRightCircle } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <main className="max-w-7xl m-auto w-full flex flex-col divide-y divide-zinc-800">
      <Hero1 />
      <Hero2 />
      <Hero3 />
    </main>
  );
}

function Hero1() {
  return (
    <div className="py-20">
      <div className="grid grid-cols-2 gap-x-8">
        <div className="grid items-center">
          <div className="flex flex-col">
            <p className="uppercase text-sm text-zinc-300 font-medium">
              SOME TOP TEXT
            </p>
            <h1 className="text-4xl py-8 font-medium max-w-xl">
              Deploy backend applications and databases in minutes.
            </h1>
            <div className="flex items-center gap-4">
              <Link href={"#"}>
                <Button className="rounded-full gap-2">
                  Get started
                  <ChevronRightCircle size={16} />
                </Button>
              </Link>
              <Link href={"#"}>
                <Button variant={"ghost"} className="rounded-full gap-2">
                  Learn more
                  <ChevronRightCircle size={16} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div className="aspect-video">
          {/**Replace with an image! */}
          <div className="z-10 border border-white/30 m-auto p-2 bg-white/20 w-full rounded-xl">
            <img
              src="/assets/dashboard.png"
              className="rounded-xl bg-black p-4 z-10"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero2() {
  return (
    <div className="max-w-7xl m-auto px-4 min-h-[70vh] grid items-center ">
      <div className="flex flex-col items-center">
        <h1 className="text-center bg-gradient-to-r max-w-4xl dark:from-white dark:to-zinc-300 from-black to-zinc-700 bg-clip-text text-transparent text-4xl sm:text-5xl sm:leading-none lg:text-6xl">
          Build this weekend.
          <br />
          <span className="bg-gradient-to-r from-violet-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            Ship on tuesday.
          </span>
        </h1>
        <p className="text-center py-6 text-sm sm:text-base lg:text-lg text-muted max-w-[60ch] opacity-80">
          Say goodbye to complex cloud infrastructure. Say hello to modern
          engineering..
        </p>
        <div className="flex items-center gap-4">
          <Link href={"#"}>
            <Button className="rounded-full gap-2">
              Get started
              <ChevronRightCircle size={16} />
            </Button>
          </Link>
          <Link href={"#"}>
            <Button variant={"ghost"} className="rounded-full gap-2">
              Learn more
              <ChevronRightCircle size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function Hero3() {
  return <div className=""></div>;
}
