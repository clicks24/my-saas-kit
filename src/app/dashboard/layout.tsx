import { Header } from "@/components/blocks/header";
import { Navigation, NavigationLink } from "@/components/ui/navigation";
import { getSignedInUser } from "@/lib/auth/helper";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSignedInUser();

  return (
    <div className="flex flex-col">
      <Header />
      <div className="w-full pt-2">
        <Navigation orientation="horizontal">
          <div className="max-w-7xl mx-auto w-full flex items-center gap-4 px-4">
            <NavigationLink
              orientation="horizontal"
              href={"/dashboard"}
              name={"Dashboard"}
            />
            <NavigationLink
              orientation="horizontal"
              href={"/dashboard/settings"}
              name={"Settings"}
            />
            <NavigationLink
              href="/dashboard/admin"
              orientation="horizontal"
              name="Admin"
            />
          </div>
        </Navigation>
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col pt-4 px-4">{children}</div>
        </div>
      </div>
      <div className="h-20 w-full" />
    </div>
  );
}
