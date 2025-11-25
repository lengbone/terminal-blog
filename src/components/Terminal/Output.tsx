import { ReactNode } from "react";

interface OutputProps {
  children: ReactNode;
  className?: string;
}

export default function Output({ children, className = "" }: OutputProps) {
  return (
    <div className={`text-[var(--terminal-text)] text-sm leading-relaxed ${className}`}>
      {children}
    </div>
  );
}
