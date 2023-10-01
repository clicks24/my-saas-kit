import { Footer } from "@/components/blocks/footer";
import { Header } from "@/components/blocks/header";
import fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import path from "path";

const postsDirectory = path.join(process.cwd(), "posts");

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const fullPath = path.join(postsDirectory, slug + ".mdx");
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { content, frontmatter } = await compileMDX<{ title: string }>({
    source: fileContents,
    options: { parseFrontmatter: true },
  });
  return (
    <main>
      <Header />
      <div className="max-w-2xl m-auto px-4 w-full pb-20">
        <div className="flex flex-col items-center py-20">
          <p className="dark:text-gray-300 text-gray-400 text-sm rounded-full border dark:border-zinc-800 border-zinc-200 px-4 h-8 grid place-items-center">
            {/*@ts-ignore */}
            Published on {frontmatter.date}
          </p>
          <p className="text-4xl font-medium py-6">{frontmatter.title}</p>
        </div>
        {content}
      </div>
      <Footer />
    </main>
  );
}
