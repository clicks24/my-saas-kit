"use server";

import { BarChart } from "@/components/ui/bar-chart";
import { prisma } from "@/lib/database";
import { User } from "@prisma/client";

function generateChartData(users: User[]) {
  let today = new Date();
  let data = [];

  const dates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
  });

  for (var day of dates) {
    let count = 0;
    for (var user of users) {
      const userJoinedOn = new Date(user.created.toDateString());
      const compareDate = new Date(day.toDateString());

      if (
        userJoinedOn.getDate() == compareDate.getDate() &&
        userJoinedOn.getMonth() == compareDate.getMonth() &&
        userJoinedOn.getFullYear() == compareDate.getFullYear()
      ) {
        count++;
      }
    }

    data.push({
      date: day.getTime(),
      value: count,
    });
  }

  return data.reverse();
}
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
      <BarChart tooltip="Recent users" name="Users" data={data} />
    </main>
  );
}
