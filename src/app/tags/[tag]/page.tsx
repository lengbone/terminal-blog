import Link from "next/link";
import { notFound } from "next/navigation";
import { TerminalWindow, Prompt, Output } from "@/components/Terminal";
import { getPostsByTag, getAllTags, formatDate } from "@/lib/posts";

interface Props {
  params: Promise<{ tag: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((item) => ({ tag: item.tag }));
}

export async function generateMetadata({ params }: Props) {
  const { tag } = await params;
  return {
    title: `#${tag} | Terminal Blog`,
    description: `Posts tagged with ${tag}`,
  };
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params;
  const posts = getPostsByTag(tag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-2 py-8">
      <TerminalWindow title={`blog@localhost:~/tags/${tag}`}>
        <div className="space-y-4">
          <Prompt command={`grep -r "${tag}" ./posts`} />
          <Output className="mt-2">
            <p className="text-[var(--terminal-gray)] mb-4">
              Found <span className="text-[var(--terminal-green)]">{posts.length}</span> posts
              with tag <span className="text-[var(--terminal-purple)]">#{tag}</span>
            </p>

            <div className="space-y-1">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/posts/${post.slug}`}
                  className="block hover:bg-[var(--terminal-bg-secondary)] py-2 px-2 -mx-2 rounded transition-colors group"
                >
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-[var(--terminal-gray)]">{formatDate(post.date)}</span>
                    <span className="text-[var(--terminal-cyan)] group-hover:opacity-80">
                      {post.slug}.mdx
                    </span>
                  </div>
                  <p className="text-[var(--terminal-gray)] text-xs mt-1 ml-[88px]">
                    {post.description}
                  </p>
                </Link>
              ))}
            </div>
          </Output>

          <div className="mt-4">
            <Link
              href="/tags"
              className="text-sm text-[var(--terminal-purple)] hover:opacity-80 transition-colors"
            >
              <span className="text-[var(--terminal-gray)]">$</span> cd ../tags →
            </Link>
          </div>

        </div>
      </TerminalWindow>
    </div>
  );
}
