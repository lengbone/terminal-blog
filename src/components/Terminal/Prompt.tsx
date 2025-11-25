interface PromptProps {
  command?: string;
  showCursor?: boolean;
}

export default function Prompt({ command, showCursor = false }: PromptProps) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <span className="text-[var(--terminal-purple)]">$</span>
      {command && <span className="text-[var(--terminal-green)] ml-1">{command}</span>}
      {showCursor && <span className="cursor-blink text-[var(--terminal-green)]">▊</span>}
    </div>
  );
}
