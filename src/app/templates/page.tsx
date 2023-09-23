import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { GradientBorder } from "@/components/ui/gradient-border";
import Link from "next/link";

export default function Page() {
  return (
    <main>
      <Header />
      <div className="max-w-7xl m-auto w-full py-20">
        <div className="grid grid-cols-2 gap-8">
          <ComponentType
            title="Hero sections"
            href="/templates/hero-sections"
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}

function ComponentType({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      className="duration-150 border dark:border-zinc-800 border-zinc-200 rounded-md hover:dark:border-zinc-600 hover:border-zinc-100"
    >
      <div
        style={{
          backgroundImage: `url("/assets/hero-example-2.png")`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: 'center'
        }}
      >
        <div className="grid place-items-center bg-gradient-radial from-black/60 to-black  py-20">
          <p className="text-2xl font-medium">{title}</p>
        </div>
      </div>
    </Link>
  );
}
