"use client";

import { GradientBorder } from "@/components/ui/gradient-border";
import {
  ChevronsUpDown,
  CreditCard,
  Home,
  Menu,
  Moon,
  Settings,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Toggle } from "@/components/ui/toggle";
import { Role } from "@prisma/client";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";
import { SidebarItem } from "./sidebar-item";
import useHasMounted from "@/lib/hooks/use-has-mounted";
import useUserSubscription from "@/lib/hooks/use-user-subscription";

export default function Sidebar({ session }: { session: Session }) {
  const [menu, setMenu] = useState(false);

  const pathname = usePathname();
  const mounted = useHasMounted();

  const workSpace = pathname.includes("admin")
    ? "Admin Workspace"
    : "Personal Workspace";

  const { theme, setTheme } = useTheme();

  return (
    <div className="w-full sm:w-fit flex relative">
      {mounted && (
        <Toggle
          className="fixed bottom-5 right-5"
          onClick={() =>
            theme == "dark" ? setTheme("light") : setTheme("dark")
          }
        >
          {theme == "light" ? <Sun size={16} /> : <Moon size={16} />}
        </Toggle>
      )}
      <div className="sm:hidden flex justify-between w-full px-4 py-6 relative">
        <Link href={"/dashboard"}>
          <img src="/logo.svg" className="w-10 h-10 rounded-full" />
        </Link>
        <button onClick={() => setMenu(!menu)}>
          <Menu size={32} className="shrink-0" />
        </button>
        {menu && (
          <div className="absolute dark:bg-black bg-white border dark:border-zinc-900 border-zinc-200 rounded-md top-20 right-0">
            <div className="flex flex-col gap-2 p-4">
              <SidebarItem
                icon={<Home size={18} />}
                title="Dashboard"
                href="/dashboard"
              />
              <SidebarItem
                icon={<Settings size={18} />}
                title="Settings"
                href="/dashboard/settings"
              />
            </div>
          </div>
        )}
      </div>
      <div className="shrink-0 w-[250px] sm:flex hidden" />
      <div className="shrink-0 w-[250px] sm:flex hidden fixed">
        <div className="flex flex-col justify-between min-h-screen border-r border-zinc-200 dark:border-zinc-800">
          <div className="flex flex-col ">
            <div className="h-16 px-6 grid items-center border-b border-zinc-200 dark:border-zinc-800">
              <Link href={"/dashboard"}>
                <img src="/logo.svg" className="w-10 h-10 rounded-full" />
              </Link>
            </div>
            <div className="flex flex-col gap-2 px-4 py-8">
              <SidebarItem
                icon={<Home size={18} />}
                title="Dashboard"
                href="/dashboard"
              />
              <SidebarItem
                icon={<Settings size={18} />}
                title="Settings"
                href="/dashboard/settings"
              />
            </div>
          </div>
          <div className="py-8 max-w-[250px]">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="px-2 flex justify-between duration-150 items-center gap-2 dark:hover:bg-zinc-800 hover:bg-zinc-200/70 rounded-md cursor-pointer">
                  {(session.user.image?.length ?? 0) > 0 ? (
                    <img
                      src={"" + session.user.image}
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <GradientBorder className="rounded-full w-fit">
                      <div className="w-8 h-8 shrink-0 grid place-items-center ">
                        <p className="font-medium">
                          {session.user?.email?.substring(0, 1)}
                        </p>
                      </div>
                    </GradientBorder>
                  )}
                  <p className="truncate text-sm">{session.user.email}</p>
                  <ChevronsUpDown size={16} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"/dashboard/settings"}>Settings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button onClick={() => signOut()}>Log out</button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  {session.user.role == Role.ADMIN ? (
                    <Link href={"/dashboard/admin"}>Admin</Link>
                  ) : (
                    <p className="flex w-full items-center justify-between gap-2">
                      Admin{" "}
                      <p className="text-xs text-rose-500 bg-rose-400/20 px-2 py-1 rounded-md">
                        NO PERMISSION
                      </p>
                    </p>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
