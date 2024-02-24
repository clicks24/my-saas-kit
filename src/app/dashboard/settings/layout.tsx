import { Header } from "@/components/blocks/header";
import { Navigation, NavigationLink } from "@/components/ui/navigation";
import { getSignedInUser } from "@/lib/auth/helper";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSignedInUser();

  return (
    <main className="flex flex-col gap-4 max-w-2xl w-full mx-auto">
      <p className="text-2xl font-semibold tracking-tight">Settings</p>
      <Navigation orientation="horizontal">
        <NavigationLink
          href="/dashboard/settings"
          orientation="horizontal"
          name="Account"
        />
        <NavigationLink
          href="/dashboard/settings/billing"
          orientation="horizontal"
          name="Billing"
        />
      </Navigation>
      {children}
    </main>
  );
}
