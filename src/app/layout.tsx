import { AuthProvider } from "@/components/providers/auth-provider";
import { Provider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import "./globals.css";

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
            {children}
          </Provider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
