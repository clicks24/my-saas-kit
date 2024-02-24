"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function Navigation({
  children,
  orientation = "horizontal",
}: {
  children: React.ReactNode;
  orientation: "vertical" | "horizontal";
}) {
  return (
    <div
      className={cn("border-b border-border dark:border-dark-border flex flex-row gap-4", {
        "flex-col items-start gap-1 border-transparent border-0":
          orientation == "vertical",
      })}
    >
      {children}
    </div>
  );
}

function NavigationLink({
  href,
  name,
  active,
  orientation = "horizontal",
  icon
}: {
  href: string;
  name: string;
  icon?: React.ReactNode;
  active?: boolean;
  orientation: "vertical" | "horizontal";
}) {
  const pathname = usePathname();

  let isActive = pathname == href;

  if (active) {
    isActive = true;
  }

  return (
    <Link
      href={href}
      className={cn("flex flex-col gap-1 group", {
        "flex-row-reverse items-center": orientation == "vertical",
      })}
    >
      <div
        className={cn(
          "text-sm tracking-tight rounded font-semibold h-9 px-2 text-muted  w-fit hover:bg-container dark:hover:bg-dark-container duration-150 flex items-center gap-2",
          { "text-primary dark:text-dark-primary ": isActive },
          { "group-hover:text-primary dark:group-hover:text-dark-primary text-muted ": !isActive },
          {
            "py-1.5": orientation == "vertical",
          }
        )}
      >
        {icon}
        {name}
      </div>

      <div
        className={cn("bg-transparent w-full h-[2px]", {
          "bg-blue-500": isActive,
        })}
      />
    </Link>
  );
}

export { Navigation, NavigationLink };
