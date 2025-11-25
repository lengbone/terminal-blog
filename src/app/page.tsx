import Link from "next/link";
import { TerminalWindow, Prompt, Output } from "@/components/Terminal";
import { getAllPosts, formatDate } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts().slice(0, 5);

  return (
    <div className="max-w-4xl mx-auto px-2 py-8">
      <TerminalWindow title="blog@localhost:~">
        {/* Welcome command */}
        <div className="space-y-4">
          <Prompt command="cat welcome.txt" />
          <Output>
            <pre className="text-[var(--terminal-green)] text-xs sm:text-sm leading-relaxed overflow-x-auto">
{`
 ████████╗███████╗██████╗ ███╗   ███╗
 ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║
    ██║   █████╗  ██████╔╝██╔████╔██║
    ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║
    ██║   ███████╗██║  ██║██║ ╚═╝ ██║
    ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝
`}
            </pre>
            <p className="text-[var(--terminal-text)] mt-4">
              Welcome to my terminal blog.
            </p>
            <p className="text-[var(--terminal-gray)] mt-1">
              Type &apos;help&apos; for available commands, or explore using the navigation above.
            </p>
          </Output>

          {/* List posts command */}
          <div className="mt-8">
            <Prompt command="ls -la posts/ | head -5" />
            <Output className="mt-2">
              {posts.length > 0 ? (
                <div className="space-y-2">
                  {/* Desktop header */}
                  <div className="hidden sm:grid grid-cols-4 gap-4 text-xs text-[var(--terminal-gray)] pb-2 mb-2">
                    <span>permissions</span>
                    <span>date</span>
                    <span>size</span>
                    <span>name</span>
                  </div>
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/posts/${post.slug}`}
                      className="block sm:grid sm:grid-cols-4 gap-1 sm:gap-4 text-sm hover:bg-[var(--terminal-bg-secondary)] py-2 px-2 -mx-2 rounded transition-colors group"
                    >
                      <span className="hidden sm:inline text-[var(--terminal-yellow)]">-rw-r--r--</span>
                      <span className="text-[var(--terminal-cyan)] group-hover:opacity-80 sm:order-last truncate">
                        {post.slug}.mdx
                      </span>
                      <div className="flex gap-3 text-xs sm:text-sm sm:contents mt-1 sm:mt-0">
                        <span className="text-[var(--terminal-gray)]">{formatDate(post.date)}</span>
                        <span className="text-[var(--terminal-gray-light)]">{post.readingTime}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--terminal-gray)]">No posts found. Create your first post in content/posts/</p>
              )}
            </Output>
          </div>

          {/* View all link */}
          {posts.length > 0 && (
            <div className="mt-4">
              <Link
                href="/posts"
                className="text-sm text-[var(--terminal-purple)] hover:opacity-80 transition-colors"
              >
                <span className="text-[var(--terminal-gray)]">$</span> ls posts/ --all →
              </Link>
            </div>
          )}

        </div>
      </TerminalWindow>
    </div>
  );
}
