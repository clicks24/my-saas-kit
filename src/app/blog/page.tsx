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
      <div className="max-w-2xl m-auto px-4 w-full pb-20">
        <div className="flex flex-col py-10">
          <p className="text-4xl font-medium py-4">Blog</p>
          <p className="opacity-80 text-sm">Read our most recent blog posts</p>
        </div>
        <div className="flex flex-col">
          {posts.map((item, index) => (
            /*@ts-ignore */
            <Link href={"/blog/" + item.slug} className="py-4" key={index}>
              <div className="flex flex-col">
                {/*@ts-ignore */}
                <p className="text-2xl font-medium">{item.title}</p>
                {/*@ts-ignore */}
                <p className="font-normal py-1">{item.description}</p>
                <div className="flex items-center gap-1 opacity-80">
                  {/*@ts-ignore */}
                  <p className="text-sm">{item.author}</p>
                  <Dot size={16} />
                  {/*@ts-ignore */}
                  <p className="text-sm">{item.date}</p>
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
