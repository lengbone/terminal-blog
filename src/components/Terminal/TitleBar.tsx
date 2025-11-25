interface TitleBarProps {
  title: string;
}

export default function TitleBar({ title }: TitleBarProps) {
  return (
    <div className="bg-[var(--terminal-bg-secondary)]/50 px-4 py-2 flex items-center gap-2 transition-colors">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-[var(--terminal-red)]" />
        <div className="w-3 h-3 rounded-full bg-[var(--terminal-yellow)]" />
        <div className="w-3 h-3 rounded-full bg-[var(--terminal-green)]" />
      </div>
      <span className="flex-1 text-center text-[var(--terminal-gray)] text-sm">{title}</span>
      <div className="w-[52px]" /> {/* Spacer for balance */}
    </div>
  );
}
