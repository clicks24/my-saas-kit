import { Button } from "@/components/ui/button";
import { ArrowLeft, ChevronLeftCircle } from "lucide-react";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className=" bg-space-light light">
      <Link href="/" className="fixed top-3 left-5">
        <Button className="gap-2" size={"xs"} variant={"link"}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>
      </Link>
      <div className="grid place-items-center min-h-screen py-10">
        <div className="max-w-sm bg-white dark:bg-space-dark w-full p-8 shadow-xl rounded-xl light">
          {children}
        </div>
      </div>
    </div>
  );
}
