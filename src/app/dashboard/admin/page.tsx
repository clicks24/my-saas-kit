import { toast } from "@/components/ui/use-toast";
import { getSignedInUser } from "@/lib/auth/helper";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { OverviewPage } from "./(overview)/overview";
import { PlansPage } from "./(plans)/plans";
import AddSlotForm from "./(slots)/_components/AddSlotForm";
import { UsersPage } from "./(users)/users";

export default async function Page() {
  const session = await getSignedInUser();

  if (!(session.user.role == Role.ADMIN)) {
    toast({
      title: "No permission",
      description: "You don't have the role ADMIN and can't view this page. ",
    });
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-col gap-8">
      <p className="text-2xl font-semibold tracking-tight">Admin</p>
      <OverviewPage />
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-semibold tracking-tight">Users</p>
        <UsersPage />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-semibold tracking-tight">Plans</p>
        <PlansPage />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-2xl font-semibold tracking-tight">Add Slot Form</p>
        <AddSlotForm />
      </div>
    </main>
  );
}
