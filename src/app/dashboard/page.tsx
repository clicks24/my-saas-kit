import { BarChart } from "@/components/ui/bar-chart";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Heading } from "@/components/ui/typography";
import { authOptions } from "@/lib/auth/options";
import { getSubscriptions } from "@/lib/billing";
import { randomInt } from "crypto";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const subscriptions = await getSubscriptions(
    String(session?.user.stripe_customer_id)
  );

  function generatePastDaysList(
    numDays: number
  ): { date: number; value: number }[] {
    const now = new Date().getTime();
    const dayInMilliseconds = 24 * 60 * 60 * 1000;
    const pastDaysList = [];

    for (let i = 1; i <= numDays; i++) {
      const pastDate = new Date(now - i * dayInMilliseconds);
      const formattedObject = {
        date: pastDate.getTime(),
        value: i * 2 + randomInt(600),
      };
      pastDaysList.push(formattedObject);
    }

    return pastDaysList;
  }

  const data = generatePastDaysList(14).reverse();
  const data1 = generatePastDaysList(14).reverse();
  const data2 = generatePastDaysList(14).reverse();

  return (
    <main className="flex flex-col gap-8">
      <Heading className="text-2xl font-semibold">Dashboard</Heading>
      <div className="grid md:grid-cols-3 gap-12">
        <BarChart
          data={data}
          tooltip="This is fake data for display purposes only."
          name="Avg. order value"
        />
        <BarChart
          data={data1}
          tooltip="This is fake data for display purposes only."
          name="Gross revenue"
        />
        <BarChart
          data={data2}
          tooltip="This is fake data for display purposes only."
          name="Profit"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription className="flex flex-col gap-4">
              View and manage your account and billing settings.
              <Link href={"/dashboard/settings"}>
                <Button>View settings</Button>
              </Link>
            </CardDescription>
          </CardHeader>

        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Discord</CardTitle>
            <CardDescription className="flex flex-col gap-4">
              Join our community of developers on discord.
              <Link href={"https://discord.gg/sAcvuQACYQ"}>
                <Button>Join the discord</Button>
              </Link>
            </CardDescription>
          </CardHeader>

        </Card>
      </div>
    </main>
  );
}


