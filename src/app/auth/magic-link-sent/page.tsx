"use client";

import { Heading } from "@/components/ui/typography";

export default function Page() {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col">
      <Heading className="text-xl">Magic link sent</Heading>
        <p className="text-muted tracking-tight">
          {"Please check your email for a magic sign-in link."}
        </p>
      </div>
    </div>
  );
}
