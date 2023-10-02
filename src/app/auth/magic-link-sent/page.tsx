"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { GradientBorder } from "@/components/ui/gradient-border";
import { Input } from "@/components/ui/input";
import { AlertTriangle, Check, Mail } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  return (
    <div className="flex flex-col">
      <div className="shrink-0">
        <Mail size={18} />
      </div>

      <div className="flex flex-col pt-8">
        <p className="dark:text-white text-black text-lg font-medium">
          Magic link sent
        </p>
        <p className="text-zinc-400">
          {"Please check your email for a magic sign-in link."}
        </p>
      </div>
    </div>
  );
}
