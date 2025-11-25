import { TerminalWindow, Prompt, Output } from "@/components/Terminal";
import { siteConfig } from "@/lib/config";

export default function AboutPage() {
  const { author, links } = siteConfig;

  return (
    <div className="max-w-4xl mx-auto px-2 py-8">
      <TerminalWindow title="blog@localhost:~/about">
        <div className="space-y-6">
          {/* whoami */}
          <div>
            <Prompt command="whoami" />
            <Output className="mt-1">
              <span className="text-[var(--terminal-green)]">{author.name}</span>
            </Output>
          </div>

          {/* cat profile */}
          <div>
            <Prompt command="cat ~/.profile" />
            <Output className="mt-2">
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-[var(--terminal-gray)]">Name:</span>{" "}
                  <span className="text-[var(--terminal-green)]">{author.name}</span>
                </p>
                <p>
                  <span className="text-[var(--terminal-gray)]">Role:</span>{" "}
                  <span className="text-[var(--terminal-cyan)]">{author.role}</span>
                </p>
                <p>
                  <span className="text-[var(--terminal-gray)]">Location:</span>{" "}
                  <span className="text-[var(--terminal-yellow)]">{author.location}</span>
                </p>
                <p>
                  <span className="text-[var(--terminal-gray)]">Skills:</span>{" "}
                  <span className="text-[var(--terminal-purple)]">
                    [{author.skills.join(", ")}]
                  </span>
                </p>
              </div>
            </Output>
          </div>

          {/* About text */}
          <div>
            <Prompt command="cat about.txt" />
            <Output className="mt-2">
              <div className="text-[var(--terminal-text)] space-y-4 leading-relaxed">
                <p>{author.bio}</p>
              </div>
            </Output>
          </div>

          {/* Social links */}
          <div>
            <Prompt command="cat ~/.ssh/social.pub" />
            <Output className="mt-2">
              <div className="space-y-1 text-sm">
                {links.github && (
                  <p>
                    <span className="text-[var(--terminal-gray)]">GitHub:</span>{" "}
                    <a
                      href={links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--terminal-cyan)] hover:opacity-80"
                    >
                      {links.github.replace("https://", "")}
                    </a>
                  </p>
                )}
                {links.twitter && (
                  <p>
                    <span className="text-[var(--terminal-gray)]">Twitter:</span>{" "}
                    <a
                      href={links.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--terminal-cyan)] hover:opacity-80"
                    >
                      {links.twitter.replace("https://twitter.com/", "@")}
                    </a>
                  </p>
                )}
                {links.email && (
                  <p>
                    <span className="text-[var(--terminal-gray)]">Email:</span>{" "}
                    <a
                      href={`mailto:${links.email}`}
                      className="text-[var(--terminal-cyan)] hover:opacity-80"
                    >
                      {links.email}
                    </a>
                  </p>
                )}
              </div>
            </Output>
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
}
