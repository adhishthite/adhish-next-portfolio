"use client";

import Image from "next/image";
import { Children, isValidElement, type ReactNode } from "react";
import { Mermaid } from "./mermaid";

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

  const props = child.props as { className?: string; "data-language"?: string };
  const className = props.className || "";
  return (
    className === "language-mermaid" ||
    className.includes("language-mermaid") ||
    props["data-language"] === "mermaid"
  );
}

// MDX Pre component - intercepts mermaid code blocks
export const MDXPre = ({ children, ...props }: any) => {
  // Handle direct children or nested code element
  const childArray = Children.toArray(children);
  const codeChild = childArray.find(
    (child) => isValidElement(child) && child.type === "code",
  );

  const targetChild = codeChild || childArray[0];

  if (isMermaidBlock(targetChild)) {
    const chart = extractTextContent(
      isValidElement(targetChild)
        ? (targetChild.props as { children?: ReactNode }).children
        : targetChild,
    );
    return <Mermaid chart={chart.trim()} />;
  }

  return <pre {...props}>{children}</pre>;
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

// MDX Paragraph component with style support
export const MDXParagraph = (props: any) => {
  // Handle styled paragraph elements
  if (props.style) {
    return <p {...props} />;
  }
  return <p className="mb-4" {...props} />;
};
