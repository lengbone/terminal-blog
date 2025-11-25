"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { useTheme, type Theme } from "@/hooks";

const COMMANDS: Record<string, { description: string; action?: string }> = {
  help: { description: "Show available commands" },
  ls: { description: "List posts", action: "/posts" },
  "ls posts": { description: "List posts", action: "/posts" },
  cd: { description: "Navigate to a page" },
  "cd posts": { description: "Go to posts", action: "/posts" },
  "cd about": { description: "Go to about", action: "/about" },
  "cd tags": { description: "Go to tags", action: "/tags" },
  "cd ~": { description: "Go to home", action: "/" },
  "cd ..": { description: "Go to home", action: "/" },
  grep: { description: "Search posts", action: "/search" },
  search: { description: "Search posts", action: "/search" },
  clear: { description: "Clear terminal" },
  whoami: { description: "About me", action: "/about" },
  theme: { description: "Change theme (theme <name>)" },
};

interface CommandInputProps {
  onOutput?: (output: string) => void;
  onClear?: () => void;
}

export default function CommandInput({ onOutput, onClear }: CommandInputProps) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { theme, changeTheme, getThemeList } = useTheme();

  const executeCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (!trimmedCmd) return;

    // Add to history
    setHistory((prev) => [...prev, trimmedCmd]);
    setHistoryIndex(-1);

    // Handle commands
    if (trimmedCmd === "help") {
      const helpText = Object.entries(COMMANDS)
        .map(([cmd, { description }]) => `  ${cmd.padEnd(15)} - ${description}`)
        .join("\n");
      onOutput?.(`Available commands:\n${helpText}`);
    } else if (trimmedCmd === "clear") {
      onClear?.();
    } else if (COMMANDS[trimmedCmd]?.action) {
      router.push(COMMANDS[trimmedCmd].action!);
    } else if (trimmedCmd.startsWith("cat ")) {
      const slug = trimmedCmd.replace("cat ", "").replace(".mdx", "");
      router.push(`/posts/${slug}`);
    } else if (trimmedCmd.startsWith("grep ") || trimmedCmd.startsWith("search ")) {
      router.push("/search");
    } else if (trimmedCmd.startsWith("cd ")) {
      const path = trimmedCmd.replace("cd ", "");
      if (path === "~" || path === "..") {
        router.push("/");
      } else {
        router.push(`/${path}`);
      }
    } else if (trimmedCmd === "theme") {
      // 显示可用主题列表
      const themeList = getThemeList();
      const themeText = themeList
        .map((t) => `  ${t.key.padEnd(10)} - ${t.description}${t.key === theme ? " (current)" : ""}`)
        .join("\n");
      onOutput?.(`Available themes:\n${themeText}\n\nUsage: theme <name>`);
    } else if (trimmedCmd.startsWith("theme ")) {
      // 切换主题
      const themeName = trimmedCmd.replace("theme ", "") as Theme;
      if (changeTheme(themeName)) {
        onOutput?.(`Theme changed to: ${themeName}`);
      } else {
        const themeList = getThemeList();
        onOutput?.(`Unknown theme: ${themeName}\nAvailable: ${themeList.map((t) => t.key).join(", ")}`);
      }
    } else {
      onOutput?.(`command not found: ${trimmedCmd}\nType 'help' for available commands.`);
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      executeCommand(input);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex] || "");
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      // Simple autocomplete
      const matches = Object.keys(COMMANDS).filter((cmd) =>
        cmd.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) {
        setInput(matches[0]);
      }
    }
  };

  return (
    <div
      className="flex items-center text-sm cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <span className="text-[var(--terminal-purple)]">$</span>
      <span className="ml-1 relative">
        <span className="text-[var(--terminal-green)] whitespace-pre">{input}</span>
        <span className="cursor-blink text-[var(--terminal-green)]">▊</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="absolute inset-0 w-full opacity-0"
          spellCheck={false}
          autoComplete="off"
        />
      </span>
    </div>
  );
}
