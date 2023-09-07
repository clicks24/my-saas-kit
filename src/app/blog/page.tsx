import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import { GradientBorder } from "@/components/ui/gradient-border";
import { getSortedPostsData } from "@/lib/blog";
import { Book, Dot } from "lucide-react";
import Link from "next/link";

export default async function Page() {
  const posts = getSortedPostsData();
  return (
    <main>
      <Header />
      <div className="max-w-2xl m-auto px-4 w-full">
        <div className="flex flex-col items-center py-10">
          <p className="text-4xl py-4">Blog</p>
          <p className="opacity-80 text-sm">Read our most recent blog posts</p>
        </div>
        <div className="flex flex-col divide-y dark:divide-zinc-800 divide-zinc-200 pb-20">
          {posts.map((item, index) => (
            /*@ts-ignore */
            <Link href={"/blog/" + item.slug} className="py-8" key={index}>
              <div className="flex flex-row items-start gap-4">
                <GradientBorder className="p-4 rounded-md w-fit">
                  <Book />
                </GradientBorder>
                <div className="flex flex-col">
                  {/*@ts-ignore */}
                  <p className="text-2xl font-normal pb-1">{item.title}</p>
                  <div className="flex items-center gap-1 opacity-80">
                    {/*@ts-ignore */}
                    <p className="text-sm">{item.author}</p>
                    <Dot size={16} />
                    {/*@ts-ignore */}
                    <p className="text-sm">{item.date}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
