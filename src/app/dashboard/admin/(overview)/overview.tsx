"use server"

import { GradientBorder } from "@/components/ui/gradient-border";
import { prisma } from "@/lib/database";
import { Chart, generateChartData } from "./_components/chart";

export async function OverviewPage() {
  const gtaValue = new Date();

  gtaValue.setDate(gtaValue.getDate() - 10);

  const users = await prisma.user.findMany({
    where:{
      created:{
        gte: gtaValue
      }
    }
  })

  const count = await prisma.user.count()
  const data = generateChartData(users)

  return (
    <main>
      <h1 className="font-display text-2xl pb-6">Overview</h1>
      <div className="pb-8">
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
      </div>
    </main>
  );
}
