"use client";

import { Check, Copy } from "@phosphor-icons/react/ssr";
import { useRef, useState } from "react";

/**
 * Copy button for a rehype-pretty-code figure. Reads the code from the
 * sibling <pre> at click time, so the source isn't serialised twice.
 */
export function CodeCopyButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const pre = ref.current?.closest("figure")?.querySelector("pre");
    const code = pre?.textContent?.replace(/\n$/, "") ?? "";
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={handleCopy}
      aria-label={copied ? "Copied" : "Copy code"}
      className="code-copy"
      data-copied={copied || undefined}
    >
      {copied ? (
        <Check className="size-3.5" weight="bold" aria-hidden />
      ) : (
        <Copy className="size-3.5" aria-hidden />
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </button>
  );
}
