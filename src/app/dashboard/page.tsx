import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GradientBorder } from "@/components/ui/gradient-border";
import { authOptions } from "@/lib/auth/options";
import { getSubscriptions } from "@/lib/billing";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function Page() {
  const session = await getServerSession(authOptions);
  const subscriptions = await getSubscriptions(
    String(session?.user.stripe_customer_id)
  );

  return (
    <main>
      <h1 className="font-display text-2xl pb-6">Dashboard</h1>
      <Card className="mb-8">
        <div className="flex flex-row w-full justify-between items-center px-6">
          <div className="flex items-center gap-4 py-6">
            {(session?.user?.image?.length ?? 0) > 0 ? (
              <img
                src={"" + session?.user.image}
                className="w-16 h-16 rounded-full"
              />
            ) : (
              <GradientBorder className="rounded-full w-fit">
                <div className="w-16 h-16 shrink-0 grid place-items-center text-white">
                  <p className="font-medium">
                    {session?.user?.email?.substring(0, 1)}
                  </p>
                </div>
              </GradientBorder>
            )}
            <div className="flex flex-col">
              <p className="text-sm opacity-80">Welcome back,</p>
              <p className="text-2xl font-semibold">{session?.user.name}</p>
              <p className="text-sm opacity-80">{session?.user.email}</p>
            </div>
          </div>
          <Link href={"/dashboard/settings"}>
            <Button size={"sm"}>Settings</Button>
          </Link>
        </div>
      </Card>
      <div className="grid sm:grid-cols-2 gap-8 items-start">
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>
              View and manage your account and billing settings.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={"/dashboard/settings"}>
              <Button size={"sm"}>View settings</Button>
            </Link>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Discord</CardTitle>
            <CardDescription>
              Join our community of developers on discord.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Link href={"https://discord.gg/sAcvuQACYQ"}>
              <Button size={"sm"}>Join the discord</Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
      <div className="">
        {subscriptions.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>You have a subscription</CardTitle>
              <CardDescription>
                You have the subscription: {subscriptions.at(0)?.plan.name}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={"/dashboard/settings"}>
                <Button size={"sm"}>Settings</Button>
              </Link>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>You do not have a subscription</CardTitle>
              <CardDescription>You are on the free plan.</CardDescription>
            </CardHeader>
            <CardFooter>
              <Link href={"/dashboard/settings"}>
                <Button size={"sm"}>Settings</Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
    </main>
  );
}
