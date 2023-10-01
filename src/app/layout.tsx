import { Provider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/components/providers/auth-provider";

export const metadata: Metadata = {
  title: "SaaS Kit",
  description: "The ultimate SaaS Kit. Build this weekend, ship on monday.",
  icons: "/logo.svg",
};

const font = localFont({
  src: "./font/Onest.ttf",
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(font.className, "dark:bg-black bg-white")}>
        <AuthProvider>
          <Provider>{children}</Provider>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  );
}
