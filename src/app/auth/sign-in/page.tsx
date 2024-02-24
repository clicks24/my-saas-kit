"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { GradientBorder } from "@/components/ui/gradient-border";
import { Input } from "@/components/ui/input";
import { Heading } from "@/components/ui/typography";
import { AlertTriangle, Lock } from "lucide-react";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [authError, setAuthError] = useState<string | null>(null);

  const query = useSearchParams();

  useEffect(() => {
    if (query?.get("error")) {
      setAuthError(query.get("error"));
    }
  }, [query]);

  return (
    <div className="flex flex-col">
      {authError && (
        <Alert variant={"destructive"} className="space-x-2 mb-6">
          <AlertTriangle />
          <p>{"There was an error sending your sign in link"}</p>
        </Alert>
      )}
      <div className="flex flex-col pb-8">
        <Heading className="text-xl">Welcome</Heading>
        <p className="text-muted tracking-tight">
          {"Please sign in or sign up below."}
        </p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col pb-4">
          <p className="text-sm text-muted pb-2">Email</p>
          <Input
            value={email}
            variant={"lg"}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="martin.shrekli@turing.com"
          />
        </div>
        <Button
          size={"lg"}
          loading={loading}
          onClick={async () => {
            setLoading(true);
            await signIn("email", { email: email, callbackUrl: "/dashboard" });
            setLoading(false);
          }}
        >
          Continue with Email
        </Button>
      </div>
      <p className="text-xs text-zinc-400 pt-4">
        By signing in, you agree to our terms, acceptable use, and privacy
        policy.
      </p>
    </div>
  );
}
