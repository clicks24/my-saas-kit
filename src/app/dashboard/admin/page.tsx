import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSignedInUser } from "@/lib/auth/helper";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { OverviewPage } from "./(overview)/overview";
import { PlansPage } from "./(plans)/plans";
import { UsersPage } from "./(users)/users";

export default async function Page(){
  const session = await getSignedInUser();

  if (session.user.role == Role.ADMIN) {
    redirect("/dashboard");
  }

  return (
    <main>
      <Tabs defaultValue="overview">
        <div className="flex items-center justify-between pb-4 mb-8 border-b dark:border-zinc-800 border-zinc-200">
          <h1 className="font-display text-2xl">Admin</h1>
          <TabsList className="flex items-center gap-2 w-fit">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="plans">Plans</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="overview">
          <OverviewPage />
        </TabsContent>
        <TabsContent value="users">
          <UsersPage />
        </TabsContent>
        <TabsContent value="plans">
          <PlansPage />
        </TabsContent>
      </Tabs>
    </main>
  );
}
