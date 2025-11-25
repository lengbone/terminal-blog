import Link from "next/link";
import { TerminalWindow, Prompt, Output } from "@/components/Terminal";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-4xl mx-auto px-2 py-8">
      <TerminalWindow title="blog@localhost:~/posts">
        <div className="space-y-4">
          <Prompt command={`find ./posts -type f -name "*.mdx" | wc -l`} />
          <Output>
            <span className="text-[var(--terminal-green)]">{posts.length}</span>
            <span className="text-[var(--terminal-gray)]"> files found</span>
          </Output>

          <div className="mt-6">
            <Prompt command="ls -la --sort=date" />
            <Output className="mt-2">
              {posts.length > 0 ? (
                <div className="space-y-2">
                  {/* Desktop header */}
                  <div className="hidden sm:grid grid-cols-4 gap-4 text-xs text-[var(--terminal-gray)] pb-2 mb-2">
                    <span>permissions</span>
                    <span>date</span>
                    <span>read time</span>
                    <span>name</span>
                  </div>
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      className="block sm:grid sm:grid-cols-4 gap-1 sm:gap-4 text-sm hover:bg-[var(--terminal-bg-secondary)] py-2 px-2 -mx-2 rounded transition-colors group"
                    >
                      <span className="hidden sm:inline text-[var(--terminal-yellow)]">-rw-r--r--</span>
                      <span className="hidden sm:inline text-[var(--terminal-gray)]">{formatDate(post.date)}</span>
                      <span className="hidden sm:inline text-[var(--terminal-gray-light)]">{post.readingTime}</span>
                      <span className="text-[var(--terminal-cyan)] group-hover:opacity-80">
                        {post.slug}.mdx
                      </span>
                      {/* Mobile: date and read time */}
                      <div className="flex gap-3 text-xs sm:hidden mt-1">
                        <span className="text-[var(--terminal-gray)]">{formatDate(post.date)}</span>
                        <span className="text-[var(--terminal-gray-light)]">{post.readingTime}</span>
                      </div>
                      <p className="text-[var(--terminal-gray)] text-xs mt-1 line-clamp-2 sm:hidden">
                        {post.description}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-[var(--terminal-gray)]">
                  <p>No posts found.</p>
                  <p className="mt-2 text-xs">
                    Create your first post at: <span className="text-[var(--terminal-cyan)]">content/posts/your-post.mdx</span>
                  </p>
                </div>
              )}
            </Output>
          </div>

        </div>
      </TerminalWindow>
    </div>
  );
}
