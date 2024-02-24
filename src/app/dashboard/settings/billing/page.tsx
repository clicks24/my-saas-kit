import { Button } from "@/components/ui/button";

import { PricingTable } from "@/components/blocks/pricing/pricing-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getSignedInUser } from "@/lib/auth/helper";
import {
  getCompletedPlans,
  getCustomerPortalLink,
  getSubscriptions,
} from "@/lib/billing";
import { prisma } from "@/lib/database";
import Link from "next/link";

export default async function Page() {
  const session = await getSignedInUser();
  const user = await prisma.user.findFirst({ where: { id: session?.user.id } });
  const subs = await getSubscriptions("" + user?.customer_id);
  const plans = await getCompletedPlans();

  return (
    <main>
      <PricingTable
        contentLeft={
          <Link href={"/checkout/portal"}>
            <Button>Manage billing</Button>
          </Link>
        }
        currentPlans={subs}
        plans={plans}
      />
    </main>
  );
}
