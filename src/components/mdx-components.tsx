"use client";

import Image from "next/image";

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
