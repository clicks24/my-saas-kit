"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientBorder } from "@/components/ui/gradient-border";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { CompletedPlan } from "@/lib/billing";
import { cn } from "@/lib/utils";
import { AlertTriangle, Check, CreditCard } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function PlanSelector({
  contentLeft,
  plans,
}: {
  contentLeft?: React.ReactNode;
  plans: CompletedPlan[];
}) {
  const [yearly, setYearly] = useState(false);
  const [selected, setSelected] = useState<CompletedPlan | null>();

  return (
    <div className="flex flex-col m-auto w-full ">
  
      <div className="flex flex-col pb-8">
        <p className="dark:text-white text-center text-black text-lg font-medium">Choose Plan</p>
      </div>
      <div className="grid gap-4 grid-cols-1">
        <div
          onClick={() => setSelected(null)}
          className={cn(
            "p-4 cursor-pointer border dark:border-zinc-800 border-zinc-200 rounded-lg",
            {
              "dark:border-emerald-500 border-emerald-400":
                selected == null,
            }
          )}
        >
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <p className="text-sm">{"Free"}</p>
              <p className="text-sm opacity-80 w-full text-center">
                The default free plan
              </p>
            </div>
            <div className="flex items-center">
              <p className="text-lg">Free</p>
            </div>
          </div>
        </div>
        {plans.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelected(item)}
            className={cn(
              "p-4 cursor-pointer border dark:border-zinc-800 border-zinc-200 rounded-lg",
              {
                "dark:border-emerald-500 border-emerald-400 ":
                  selected == item,
              }
            )}
          >
            <div className="flex justify-between items-start">
              <div className="flex flex-col">
                <p className="text-sm">{item.plan.name}</p>
                <p className="text-sm opacity-80 w-full text-center">
                  {item.plan.description}
                </p>
              </div>
              <div className="flex items-center">
                <p className="text-lg">
                  $
                  {yearly
                    ? (item.stripe_price_yearly.unit_amount ?? 0) / 100
                    : (item.stripe_price_monthly.unit_amount ?? 0) / 100}
                </p>
                <p className="text-base">{yearly ? "/year" : "/mo"}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2 py-4 justify-end">
        <Switch
          checked={yearly}
          onCheckedChange={(e) => setYearly(e)}
          id="pricing-period"
        />
        <Label htmlFor="pricing-period">Bill yearly</Label>
      </div>

      <div>
        {selected == null ? (
          <>
            <Link href="/dashboard">
              <Button className="w-full" type="submit" size={"sm"}>
                Continue
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link
              href={
                "/checkout/" +
                (yearly
                  ? "" + selected.plan.stripe_price_yearly_id
                  : "" + selected.plan.stripe_price_monthly_id)
              }
            >
              <Button className="w-full" type="submit" size={"sm"}>
                Continue with {selected.plan.name}
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
