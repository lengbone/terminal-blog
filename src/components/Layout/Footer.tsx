import { siteConfig } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="bg-[var(--terminal-bg)]/80 backdrop-blur-md mt-auto transition-colors">
      <div className="max-w-4xl mx-auto px-2 py-4 sm:py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-[var(--terminal-gray)]">
          <div className="text-xs sm:text-sm">
            <span className="text-[var(--terminal-purple)]">$</span>{" "}
            <span className="text-[var(--terminal-gray-light)]">echo</span>{" "}
            <span className="text-[var(--terminal-green)]">&quot;© 2025 {siteConfig.author.name}&quot;</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[var(--terminal-green)] transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
