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
      <div className="max-w-2xl m-auto px-4 w-full pb-10">
        <div className="flex flex-col items-center py-10">
          {/*@ts-ignore */}
          <p className="opacity-80 text-sm">{frontmatter.date}</p>
          <p className="text-4xl py-4">{frontmatter.title}</p>
          {/*@ts-ignore */}
          <p className="opacity-80 text-sm">By {frontmatter.author}</p>
        </div>
        {content}
      </div>
      <Footer />
    </main>
  );
}
