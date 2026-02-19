"use client";

import Image from "next/image";
import { Children, isValidElement, type ReactNode } from "react";
import { Mermaid } from "./mermaid";
import { CodeCopyButton } from "./code-copy-button";

// Helper to extract text content from children
function extractTextContent(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (!children) return "";

  if (Array.isArray(children)) {
    return children.map(extractTextContent).join("");
  }

  if (isValidElement(children)) {
    return extractTextContent(
      (children.props as { children?: ReactNode }).children,
    );
  }

  return "";
}

// Helper to check if a code block is mermaid
function isMermaidBlock(child: ReactNode): boolean {
  if (!isValidElement(child)) return false;

  const props = child.props as {
    className?: string;
    "data-language"?: string;
    "data-theme"?: string;
  };
  const className = props.className || "";
  return (
    className === "language-mermaid" ||
    className.includes("language-mermaid") ||
    props["data-language"] === "mermaid"
  );
}

// Check if a pre/figure element contains mermaid (works with rehype-pretty-code wrapping)
function containsMermaid(node: ReactNode): boolean {
  if (!isValidElement(node)) return false;
  const props = node.props as any;

  // Direct mermaid code element
  if (isMermaidBlock(node)) return true;

  // Check data-language on the figure/pre wrapper
  if (props["data-language"] === "mermaid") return true;

  // Recurse into children
  const children = props.children;
  if (!children) return false;
  const arr = Children.toArray(children);
  return arr.some((child) => containsMermaid(child));
}

// MDX Figure component - wraps rehype-pretty-code output
export const MDXFigure = (props: any) => {
  const dataAttr = props["data-rehype-pretty-code-figure"];
  if (dataAttr !== undefined) {
    // Check if this figure contains a mermaid block
    if (containsMermaid(props.children)) {
      const raw = extractTextContent(props.children).trim();
      return <Mermaid chart={raw} />;
    }
    // Normal rehype-pretty-code figure
    return (
      <figure
        {...props}
        className={`group relative my-6 overflow-hidden rounded-lg border border-border/40 ${props.className || ""}`}
      />
    );
  }
  return <figure {...props} />;
};

// MDX Figcaption component - filename header for code blocks
export const MDXFigcaption = (props: any) => {
  const dataAttr = props["data-rehype-pretty-code-title"];
  if (dataAttr !== undefined) {
    return (
      <figcaption
        {...props}
        className="border-b border-border/40 bg-muted/50 px-4 py-2 text-xs font-mono text-muted-foreground"
      />
    );
  }
  return <figcaption {...props} />;
};

// MDX Pre component - intercepts mermaid code blocks, adds copy button
export const MDXPre = ({ children, ...props }: any) => {
  const childArray = Children.toArray(children);
  const codeChild = childArray.find(
    (child) => isValidElement(child) && (child as any).type === "code",
  );

  const targetChild = codeChild || childArray[0];

  // Handle mermaid blocks
  if (isMermaidBlock(targetChild)) {
    const chart = extractTextContent(
      isValidElement(targetChild)
        ? (targetChild.props as { children?: ReactNode }).children
        : targetChild,
    );
    return <Mermaid chart={chart.trim()} />;
  }

  // Extract raw text for copy button
  const rawText = extractTextContent(children).trim();

  return (
    <div className="group relative">
      <CodeCopyButton code={rawText} />
      <pre
        {...props}
        className={`overflow-x-auto p-4 text-sm leading-relaxed ${props.className || ""}`}
      >
        {children}
      </pre>
    </div>
  );
};

// MDX Code component - for inline code and code blocks
export const MDXCode = ({ children, className, ...props }: any) => {
  // Check if this is a mermaid code block
  if (
    className === "language-mermaid" ||
    className?.includes("language-mermaid")
  ) {
    const chart = extractTextContent(children);
    return <Mermaid chart={chart.trim()} />;
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
};

// MDX Image component
export const MDXImage = (props: any) => (
  <Image
    {...props}
    width={props.width || 800}
    height={props.height || 450}
    alt={props.alt || ""}
    className="rounded-lg my-6"
  />
);

// MDX Link component
export const MDXLink = (props: any) => (
  <a
    {...props}
    className="text-accent hover:text-accent/80 transition-colors"
    target={props.href?.startsWith("http") ? "_blank" : undefined}
    rel={props.href?.startsWith("http") ? "noopener noreferrer" : undefined}
  />
);

// MDX Div component - catches mermaid chart divs from remark-mermaid
export const MDXDiv = (props: any) => {
  if (props["data-mermaid-chart"] !== undefined) {
    // The raw chart text is the innerHTML (HTML-escaped by remark plugin)
    const raw = extractTextContent(props.children);
    // Unescape HTML entities
    const chart = raw
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
    return <Mermaid chart={chart.trim()} />;
  }
  return <div {...props} />;
};

// MDX Paragraph component with style support
export const MDXParagraph = (props: any) => {
  if (props.style) {
    return <p {...props} />;
  }
  return <p className="mb-4" {...props} />;
};
