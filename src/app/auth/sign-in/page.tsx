"use client";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { GradientBorder } from "@/components/ui/gradient-border";
import { Input } from "@/components/ui/input";
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
      <div className="shrink-0">
        <Lock size={18} />
      </div>

      <div className="flex flex-col py-8">
        <p className="text-lg font-medium ">Welcome</p>
        <p className="text-zinc-400">{"Please sign in or sign up below."}</p>
      </div>
      <div className="flex flex-col">
        <div className="flex flex-col pb-4">
          <p className="text-sm text-zinc-400 pb-2">Email</p>
          <Input
            value={email}
            className="light"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="martin.shrekli@turing.com"
          />
        </div>
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true);
            signIn("email", { email: email, callbackUrl: "/dashboard" });
            setLoading(false);
          }}
          className="rounded-md"
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
