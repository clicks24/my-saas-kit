import { Button } from "@/components/ui/button";
import Grid from "@/components/ui/grid";
import { ArrowLeft, ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Link href="/" className="fixed top-3 left-5">
        <Button className="rounded-full" variant={"ghost"} size="icon">
          <ChevronLeft size={16} />
        </Button>
      </Link>
      <div className="grid place-items-center min-h-screen py-8">
        <div className="max-w-md w-full p-8 border-border border rounded">
          {children}
        </div>
      </div>
    </div>
  );
}
