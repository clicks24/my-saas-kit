import { Provider } from "@/components/providers/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from 'next';
import { Poppins } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: 'SaaS Kit',
  description: 'The ultimate SaaS Kit. Build this weekend, ship on monday.',
  icons: '/logo.svg'
}

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(poppins.className, "dark:bg-black bg-white")}>
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
