"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CodeCopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-3 top-3 z-10 flex items-center justify-center rounded-md border border-border/40 bg-background/80 p-1.5 text-muted-foreground opacity-0 backdrop-blur-sm transition-all hover:bg-muted hover:text-foreground group-hover:opacity-100"
      aria-label="Copy code"
      type="button"
    >
      {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
    </button>
  );
}
