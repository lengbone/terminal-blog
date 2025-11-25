import Link from "next/link";
import { TerminalWindow, Prompt, Output } from "@/components/Terminal";
import { getAllTags } from "@/lib/posts";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <div className="max-w-4xl mx-auto px-2 py-8">
      <TerminalWindow title="blog@localhost:~/tags">
        <div className="space-y-4">
          <Prompt command="tree ./tags" />
          <Output className="mt-2">
            {tags.length > 0 ? (
              <div className="space-y-1">
                <p className="text-[var(--terminal-cyan)]">tags/</p>
                {tags.map((item, index) => (
                  <Link
                    key={item.tag}
                    href={`/tags/${item.tag}`}
                    className="block hover:bg-[var(--terminal-bg-secondary)] py-1 px-2 -mx-2 rounded transition-colors group"
                  >
                    <span className="text-[var(--terminal-gray)]">
                      {index === tags.length - 1 ? "└── " : "├── "}
                    </span>
                    <span className="text-[var(--terminal-purple)] group-hover:opacity-80">
                      {item.tag}
                    </span>
                    <span className="text-[var(--terminal-gray)] ml-2">({item.count})</span>
                  </Link>
                ))}
                <p className="text-[var(--terminal-gray)] mt-4 text-sm">
                  {tags.length} directories, {tags.reduce((acc, t) => acc + t.count, 0)} files
                </p>
              </div>
            ) : (
              <p className="text-[var(--terminal-gray)]">No tags found.</p>
            )}
          </Output>

        </div>
      </TerminalWindow>
    </div>
  );
}
