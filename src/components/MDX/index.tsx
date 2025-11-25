"use client";

import { useState, ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import vim from "highlight.js/lib/languages/vim";
import bash from "highlight.js/lib/languages/bash";
import shell from "highlight.js/lib/languages/shell";
import ini from "highlight.js/lib/languages/ini";
import yaml from "highlight.js/lib/languages/yaml";
import dockerfile from "highlight.js/lib/languages/dockerfile";
import nginx from "highlight.js/lib/languages/nginx";
import sql from "highlight.js/lib/languages/sql";
import markdown from "highlight.js/lib/languages/markdown";
import lisp from "highlight.js/lib/languages/lisp";
import python from "highlight.js/lib/languages/python";
import go from "highlight.js/lib/languages/go";
import rust from "highlight.js/lib/languages/rust";
import java from "highlight.js/lib/languages/java";
import c from "highlight.js/lib/languages/c";
import cpp from "highlight.js/lib/languages/cpp";
import csharp from "highlight.js/lib/languages/csharp";
import php from "highlight.js/lib/languages/php";
import ruby from "highlight.js/lib/languages/ruby";
import swift from "highlight.js/lib/languages/swift";
import kotlin from "highlight.js/lib/languages/kotlin";
import scala from "highlight.js/lib/languages/scala";
import json from "highlight.js/lib/languages/json";
import xml from "highlight.js/lib/languages/xml";
import css from "highlight.js/lib/languages/css";
import scss from "highlight.js/lib/languages/scss";
import less from "highlight.js/lib/languages/less";
import graphql from "highlight.js/lib/languages/graphql";
import diff from "highlight.js/lib/languages/diff";
import makefile from "highlight.js/lib/languages/makefile";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import remarkGfm from "remark-gfm";

interface MDXContentProps {
  content: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 px-2 py-1 text-xs bg-[var(--terminal-bg-secondary)]/80 hover:bg-[var(--terminal-bg-secondary)] text-[var(--terminal-gray)] hover:text-[var(--terminal-text)] rounded transition-colors"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

function extractText(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (children && typeof children === "object" && "props" in children) {
    return extractText((children as { props: { children: ReactNode } }).props.children);
  }
  return "";
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[
        [
          rehypeHighlight,
          {
            detect: true,
            languages: {
              vim,
              bash,
              shell,
              ini,
              yaml,
              dockerfile,
              nginx,
              sql,
              markdown,
              lisp,
              elisp: lisp,
              python,
              go,
              rust,
              java,
              c,
              cpp,
              csharp,
              php,
              ruby,
              swift,
              kotlin,
              scala,
              json,
              xml,
              html: xml,
              css,
              scss,
              less,
              graphql,
              diff,
              makefile,
              javascript,
              js: javascript,
              typescript,
              ts: typescript,
              jsx: javascript,
              tsx: typescript,
            },
          },
        ],
      ]}
      components={{
        h1: ({ children }) => (
          <h1 className="text-2xl font-bold text-[var(--terminal-green)] mt-8 mb-4 first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="text-xl font-bold text-[var(--terminal-green)] mt-6 mb-3">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-lg font-bold text-[var(--terminal-green)] mt-4 mb-2">
            {children}
          </h3>
        ),
        h4: ({ children }) => (
          <h4 className="text-base font-bold text-[var(--terminal-green)] mt-4 mb-2">
            {children}
          </h4>
        ),
        h5: ({ children }) => (
          <h5 className="text-sm font-bold text-[var(--terminal-green)] mt-3 mb-1">
            {children}
          </h5>
        ),
        h6: ({ children }) => (
          <h6 className="text-sm font-bold text-[var(--terminal-gray-light)] mt-3 mb-1">
            {children}
          </h6>
        ),
        p: ({ children }) => (
          <p className="text-[var(--terminal-text)] leading-relaxed mb-4">{children}</p>
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            className="text-[var(--terminal-cyan)] hover:opacity-80 underline"
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),
        ul: ({ children }) => (
          <ul className="list-none space-y-1 mb-4 ml-4">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-1 mb-4 ml-4 text-[var(--terminal-text)]">
            {children}
          </ol>
        ),
        li: ({ children }) => (
          <li className="text-[var(--terminal-text)]">
            <span className="text-[var(--terminal-purple)] mr-2">•</span>
            {children}
          </li>
        ),
        code: ({ className, children }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code className="bg-[var(--terminal-bg)]/50 text-[var(--terminal-yellow)] px-1.5 py-0.5 rounded text-sm">
                {children}
              </code>
            );
          }
          return (
            <code className={`${className} text-sm`}>{children}</code>
          );
        },
        pre: ({ children }) => {
          const codeText = extractText(children);
          return (
            <div className="relative group">
              <pre className="bg-[var(--terminal-bg)]/50 ring-1 ring-[var(--terminal-ring)] rounded-lg p-4 overflow-x-auto mb-4 text-sm">
                {children}
              </pre>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={codeText} />
              </div>
            </div>
          );
        },
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-[var(--terminal-purple)]/50 pl-4 my-4 text-[var(--terminal-gray)] italic">
            {children}
          </blockquote>
        ),
        hr: () => <hr className="border-[var(--terminal-ring)] my-8" />,
        strong: ({ children }) => (
          <strong className="text-[var(--terminal-text)] font-bold">{children}</strong>
        ),
        em: ({ children }) => (
          <em className="text-[var(--terminal-gray-light)] italic">{children}</em>
        ),
        del: ({ children }) => (
          <del className="text-[var(--terminal-gray)] line-through">{children}</del>
        ),
        table: ({ children }) => (
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm">{children}</table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="border-b border-[var(--terminal-ring)]">{children}</thead>
        ),
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => (
          <tr className="border-b border-[var(--terminal-ring)]">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="text-left py-2 px-3 text-[var(--terminal-green)] font-bold">{children}</th>
        ),
        td: ({ children }) => (
          <td className="py-2 px-3 text-[var(--terminal-text)]">{children}</td>
        ),
        img: ({ src, alt }) => (
          <img src={src} alt={alt} className="max-w-full h-auto rounded-lg my-4" />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
