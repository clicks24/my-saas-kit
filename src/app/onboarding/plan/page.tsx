import { authOptions } from "@/lib/auth/options";
import { prisma } from "@/lib/database";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { getCompletedPlans } from "@/lib/billing";
import { PlanSelector } from "./_components/plan-selector";

export default async function Page() {
  const session = await getServerSession(authOptions);

  const user = await prisma.user.findFirst({ where: { id: session?.user.id } });
  const plans = await getCompletedPlans();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  return (
    <main className="w-full ">
      <PlanSelector plans={plans} />
    </main>
  );
}
