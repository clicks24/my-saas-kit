import { Button } from "@/components/ui/button";
import { ChevronLeftCircle } from "lucide-react";
import Link from "next/link";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="bg-gradient-radial from-white to-zinc-100 dark:from-zinc-900/60 dark:to-black min-h-screen">
      <Link href="/" className="p-4">
        <Button className="gap-2" size={"xs"} variant={"link"}>
          <ChevronLeftCircle size={16} />
          <span>Home</span>
        </Button>
      </Link>
      <div className="grid place-items-center h-full">
        <div className="max-w-sm w-full dark:bg-zinc-black/30 backdrop-blur-2xl sm:mt-28 mt-8 sm:p-8 px-4 sm:border dark:border-zinc-800 border-zinc-400 rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
