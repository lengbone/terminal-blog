"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { TerminalWindow, Prompt, Output } from "@/components/Terminal";

interface SearchResult {
  slug: string;
  title: string;
  description: string;
  date: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();
    setResults(data.results);
    setSearched(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-2 py-8">
      <TerminalWindow title="blog@localhost:~/search" showInput={false}>
        <div className="space-y-4">
          {/* Search input */}
          <div className="flex items-center gap-2">
            <span className="text-[var(--terminal-purple)]">$</span>
            <span className="text-[var(--terminal-green)]">grep -r</span>
            <span className="text-[var(--terminal-yellow)]">&quot;</span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="search term"
              className="bg-transparent border-none outline-none text-[var(--terminal-yellow)] placeholder-[var(--terminal-gray)] flex-1"
              autoFocus
            />
            <span className="text-[var(--terminal-yellow)]">&quot;</span>
            <span className="text-[var(--terminal-gray)]">./posts</span>
            <button
              onClick={handleSearch}
              className="text-[var(--terminal-cyan)] hover:opacity-80 transition-colors"
            >
              [Enter]
            </button>
          </div>

          {/* Results */}
          {searched && (
            <Output className="mt-4">
              {results.length > 0 ? (
                <div className="space-y-1">
                  <p className="text-[var(--terminal-gray)] mb-4">
                    Found <span className="text-[var(--terminal-green)]">{results.length}</span> matches
                  </p>
                  {results.map((result) => (
                    <Link
                      key={result.slug}
                      href={`/posts/${result.slug}`}
                      className="block hover:bg-[var(--terminal-bg-secondary)] py-2 px-2 -mx-2 rounded transition-colors group"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-[var(--terminal-purple)]">./posts/</span>
                        <div>
                          <span className="text-[var(--terminal-cyan)] group-hover:opacity-80">
                            {result.slug}.mdx
                          </span>
                          <span className="text-[var(--terminal-gray)]">:</span>
                          <span className="text-[var(--terminal-gray-light)] ml-2">{result.title}</span>
                        </div>
                      </div>
                      <p className="text-[var(--terminal-gray)] text-xs mt-1 ml-[70px]">
                        {result.description}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-[var(--terminal-gray)]">
                  No matches found for &quot;<span className="text-[var(--terminal-yellow)]">{query}</span>&quot;
                </p>
              )}
            </Output>
          )}

          {!searched && (
            <Output className="mt-4">
              <p className="text-[var(--terminal-gray)]">
                Enter a search term and press Enter to search posts.
              </p>
            </Output>
          )}

        </div>
      </TerminalWindow>
    </div>
  );
}
