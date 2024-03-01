import { AuthProvider } from "@/components/providers/auth-provider";
import { Provider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

import { ExternalLink } from "lucide-react";
import localFont from "next/font/local";

const bodyFont = localFont({
  src: "./sf.ttf",
  display: "block",
});

export const metadata: Metadata = {
  title: "SaaS Kit",
  description: "The ultimate SaaS Kit. Build this weekend, ship on monday.",
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          bodyFont.className,
          "bg-surface text-primary antialiased h-[100dvh] relative selection:text-white selection:bg-primary"
        )}
      >
        <AuthProvider>
          <Provider>
            <div className="fixed bg-amber-600 grid place-items-center bottom-0 z-[1000] w-full py-2 px-4">
              <a
                target="_blank"
                href="https://www.saasplanet.org/#pricing"
                className="text-center font-medium tracking-tight text-white hover:underline flex items-center gap-2"
              >
                New Slots Available Now!
                <ExternalLink size={14} />
              </a>
            </div>
            {children}
          </Provider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
