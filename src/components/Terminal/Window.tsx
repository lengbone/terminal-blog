import { ReactNode } from "react";
import TitleBar from "./TitleBar";
import TerminalInput from "./TerminalInput";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  showInput?: boolean;
}

export default function TerminalWindow({
  title = "blog@localhost:~",
  children,
  className = "",
  showInput = true,
}: TerminalWindowProps) {
  return (
    <div
      className={`rounded-xl overflow-hidden bg-[var(--terminal-bg-secondary)] ring-1 ring-[var(--terminal-ring)] shadow-2xl transition-colors ${className}`}
      style={{ boxShadow: `0 25px 50px -12px var(--terminal-shadow)` }}
    >
      <TitleBar title={title} />
      <div className="p-4 sm:p-6 min-h-[200px]">
        {children}
        {showInput && <TerminalInput />}
      </div>
    </div>
  );
}
