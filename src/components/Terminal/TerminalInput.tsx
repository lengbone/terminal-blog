"use client";

import { useState } from "react";
import CommandInput from "./CommandInput";
import Output from "./Output";

export default function TerminalInput() {
  const [outputs, setOutputs] = useState<string[]>([]);

  const handleOutput = (output: string) => {
    setOutputs((prev) => [...prev, output]);
  };

  const handleClear = () => {
    setOutputs([]);
  };

  return (
    <div className="mt-8 space-y-2">
      {outputs.map((output, index) => (
        <Output key={index} className="text-gray-400 whitespace-pre-wrap text-sm">
          {output}
        </Output>
      ))}
      <CommandInput onOutput={handleOutput} onClear={handleClear} />
    </div>
  );
}
