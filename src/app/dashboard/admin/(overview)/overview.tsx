"use server";

import { GradientBorder } from "@/components/ui/gradient-border";
import { prisma } from "@/lib/database";
import { Chart, generateChartData } from "./_components/chart";
import { UsersPage } from "../(users)/users";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PlansPage } from "../(plans)/plans";

export async function OverviewPage() {
  const gtaValue = new Date();

  gtaValue.setDate(gtaValue.getDate() - 10);

  const users = await prisma.user.findMany({
    where: {
      created: {
        gte: gtaValue,
      },
    },
  });

  const count = await prisma.user.count();
  const data = generateChartData(users);

  return (
    <main>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>Overview</AccordionTrigger>
          <AccordionContent>
            <GradientBorder>
              <div className="p-6">
                <div className="pb-6">
                  <div className="flex flex-col">
                    <h1 className="font-display text-sm opacity-80">Users</h1>
                    <h1 className="font-display text-2xl">{count}</h1>
                  </div>
                </div>
                <div className="h-60">
                  <Chart data={data} />
                </div>
              </div>
            </GradientBorder>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Users</AccordionTrigger>
          <AccordionContent>
            <UsersPage />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Plans</AccordionTrigger>
          <AccordionContent>
            <PlansPage />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}
