import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeftCircle } from "lucide-react";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="bg-gradient-radial from-white to-zinc-100 dark:from-zinc-900/60 dark:to-black min-h-screen">
      <Link href="/" className="fixed top-3 left-5">
        <Button className="gap-2" size={"xs"} variant={"link"}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>
      </Link>
      <div className="grid place-items-center h-full">
        <div className="max-w-sm light:bg-white w-full sm:mt-28 mt-8 p-8 border dark:border-zinc-800 border-zinc-200 rounded-xl">
          {children}
        </div>
      </div>
    </div>
  );
}
