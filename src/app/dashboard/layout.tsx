import { getSignedInUser } from "@/lib/auth/helper";
import Sidebar from "./_components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSignedInUser();

  return (
    <div className="w-full relative bg-black">
      <div className="flex sm:flex-row flex-col items-start sm:gap-x-8 bg-black">
        <Sidebar session={session} />
        <div className="w-full ">
          <div className="px-4 max-w-4xl mx-auto w-full sm:py-16 bg-black">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
