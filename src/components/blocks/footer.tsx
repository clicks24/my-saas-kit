import Link from "next/link";

import {
  Github,
  GithubIcon,
  Instagram,
  InstagramIcon,
  Twitter,
  TwitterIcon,
} from "lucide-react";

export function Footer() {
  return (
    <div className="border-border dark:border-dark-border border-y">
      <div className="m-auto max-w-7xl px-4 py-28">
        <div className="grid gap-x-8 gap-y-12 sm:grid-cols-5">
          <div className="col-span-2 flex flex-col gap-6">
            <Link href="/">
              <img src="/logo.svg" className="h-10 w-10 rounded-full" />
            </Link>
            <p className="tracking-tight font-medium">
              © Acme, Inc. All rights reserved.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-muted"> PRODUCT</p>
            <Link href="/#pricing" className="text-base hover:underline">
              <p>Pricing</p>
            </Link>
            <Link href="/#features" className="text-base hover:underline">
              <p>Features</p>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-muted">COMPANY</p>
            <Link
              href="https://discord.gg/sAcvuQACYQ"
              className="text-base hover:underline"
            >
              <p>Discord</p>
            </Link>
            <Link href="/blog" className="text-base hover:underline">
              <p>Blog</p>
            </Link>
          </div>
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-muted">LEGAL</p>
            <Link href="/#" className="text-base hover:underline">
              <p>Terms of Service</p>
            </Link>
            <Link href="/#" className="text-base hover:underline">
              <p>Privacy Policy</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
