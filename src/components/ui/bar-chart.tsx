"use client";

import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";

import { motion } from "framer-motion";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AnimatedNumber } from "./animated-number";
import { Info, InfoIcon, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

function BarChart({
  name,
  tooltip,
  data,
  prefix,
  formatScale = (val) => {
    return "$" + val;
  },
}: {
  name: string;
  tooltip: string;
  data: {
    date: number;
    value: number;
  }[];
  prefix?: string;
  formatScale?: (value: number) => string;
}) {
  let dataReverse = useMemo(() => {
    return data.reverse();
  }, [data]);
  const [loaded, setLoaded] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    setLoaded(true);

    let t = 0;

    for (var v of data) {
      t += v.value;
    }
    setTotal(t);
  }, [loaded]);

  let max: number = data[0].value;

  for (let i = 1; i < data.length; i++) {
    if (data[i].value > max) {
      max = data[i].value;
    }
  }

  function percentOf(a: number, b: number) {
    if (b === 0) {
      return "Cannot divide by zero";
    }

    const percentage = (a / b) * 100;
    return percentage;
  }

  function percentOfMax(a: number) {
    if (max === 0) {
      return "Cannot divide by zero";
    }

    const percentage = (a / max) * 100;
    return percentage;
  }

  return (
    <div className="flex flex-col">
      <div className="flex flex-col pb-2">
        <div className="flex items-center gap-3 justify-between">
          <p className="text-base font-semibold tracking-tight">{name}</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="text-muted cursor-pointer">
                  <Info strokeWidth={2.5} size={16} />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-sm tracking-tight">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p className="text-2xl font-normal tracking-tight">
          {prefix}
          <AnimatedNumber value={total} />
        </p>
      </div>

      <div className="flex flex-col divide-y divide-border w-full h-full">
        <div className="flex flex-row w-full h-full gap-2">
          <div className="flex flex-col justify-between pb-1">
            <p className="text-xs text-muted">
              {
                //@ts-ignore
                formatScale(dataReverse?.at(0).value)
              }
            </p>
            <p className="text-xs text-muted">
              {
                //@ts-ignore
                formatScale(dataReverse?.at(data.length - 1).value)
              }
            </p>
          </div>
          <div className="flex items-end justify-between gap-2 h-32 w-full pb-2">
            {dataReverse.map((item, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.div
                      initial={false}
                      animate={{
                        width: "calc(100% /" + data.length + ")",
                        height: loaded
                          ? Number(percentOfMax(item.value)) > 2
                            ? percentOfMax(item.value) + "%"
                            : "5%"
                          : "0px",
                      }}
                      className={cn(
                        "bg-primary max-w-[8px] min-w-[4px] rounded-full ",
                        {
                          "bg-muted": Number(percentOfMax(item.value)) < 1,
                        }
                      )}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    {format(item.date, "LLL dd, yyyy")}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>
        </div>

        <div className="pt-2 flex items-center">
          <div className="flex items-center justify-between flex-1">
            <p className="text-muted text-sm">
              {
                //@ts-ignore
                format(data?.at(data.length - 1).date, "LLL dd")
              }
              {" - "}
              {
                //@ts-ignore
                format(data?.at(0).date, "LLL dd")
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { BarChart };
