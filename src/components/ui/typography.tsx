import { cn } from "@/lib/utils";

import localFont from "next/font/local";

const displayFont = localFont({
  src: "../abc.ttf",
  display: "auto",
});

function Heading({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "text-3xl font-normal tracking-tight",
        className,
        displayFont.className
      )}
    >
      {children}
    </div>
  );
}

function SUBHEADING({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        "text-2xl font-semibold tracking-tight leading-[20px]",
        className
      )}
    >
      {children}
    </h2>
  );
}

function Body({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <p className={cn("text-sm font-normal tracking-tight", className)}>
      {children}
    </p>
  );
}

export { Heading, SUBHEADING, Body };
