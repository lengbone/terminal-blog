import Link from "next/link";
import { notFound } from "next/navigation";
import { TerminalWindow, Prompt, Output } from "@/components/Terminal";
import { getPostBySlug, getAllPosts, formatDate } from "@/lib/posts";
import { MDXContent } from "@/components/MDX";
import { ReadingProgress } from "@/components/UI";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };
  return {
    title: `${post.title} | Terminal Blog`,
    description: post.description,
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      <div className="max-w-4xl mx-auto px-2 py-8">
        <TerminalWindow title={`blog@localhost:~/posts/${slug}.mdx`}>
        <div className="space-y-4">
          {/* File info */}
          <Prompt command={`cat ${slug}.mdx`} />
          
          {/* Metadata */}
          <Output>
            <div className="pb-4 mb-4">
              <h1 className="text-2xl font-bold text-[var(--terminal-green)] mb-2">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--terminal-gray)]">
                <span>
                  <span className="text-[var(--terminal-gray)]">date:</span>{" "}
                  <span className="text-[var(--terminal-yellow)]">{formatDate(post.date)}</span>
                </span>
                <span>
                  <span className="text-[var(--terminal-gray)]">read:</span>{" "}
                  <span className="text-[var(--terminal-cyan)]">{post.readingTime}</span>
                </span>
              </div>
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <Link
                      key={tag}
                      href={`/tags/${tag}`}
                      className="text-xs px-2 py-1 bg-[var(--terminal-bg-secondary)] text-[var(--terminal-purple)] rounded hover:opacity-80 transition-colors"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Output>

          {/* Content */}
          <div className="prose-terminal">
            <MDXContent content={post.content} />
          </div>

          {/* EOF */}
          <Output className="mt-8 pt-4 opacity-50">
            <span className="text-[var(--terminal-gray)]">---</span>
            <span className="text-[var(--terminal-gray)] ml-2">EOF</span>
          </Output>

          {/* Navigation */}
          <div className="mt-4 flex items-center justify-between">
            <Link
              href="/posts"
              className="text-sm text-[var(--terminal-purple)] hover:opacity-80 transition-colors"
            >
              <span className="text-[var(--terminal-gray)]">$</span> cd ../posts →
            </Link>
          </div>

        </div>
        </TerminalWindow>
      </div>
    </>
  );
}
