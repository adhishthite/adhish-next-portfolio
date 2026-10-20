import Image from "next/image";
import Link from "next/link";
import {
  Children,
  type ComponentPropsWithoutRef,
  isValidElement,
  type ReactNode,
} from "react";
import { getLocalImageSize } from "@/lib/rehype-image-size";
import { CodeCopyButton } from "./code-copy-button";
import { Mermaid } from "./mermaid";

/**
 * Components handed to MDXRemote for blog posts. This module renders on the
 * server; only Mermaid and the copy button ship JS to the client.
 */

/** Width of the article column in px. Keep in sync with --article-measure in article.css. */
const ARTICLE_WIDTH = 600;
/** Tall screenshots are narrowed so they never render taller than this. */
const MAX_IMAGE_HEIGHT = 640;

function extractTextContent(children: ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (!children) return "";
  if (Array.isArray(children)) return children.map(extractTextContent).join("");
  if (isValidElement(children)) {
    return extractTextContent(
      (children.props as { children?: ReactNode }).children,
    );
  }
  return "";
}

function isMermaidBlock(node: ReactNode): boolean {
  if (!isValidElement(node)) return false;
  const props = node.props as {
    className?: string;
    "data-language"?: string;
    children?: ReactNode;
  };
  if (props["data-language"] === "mermaid") return true;
  if (props.className?.includes("language-mermaid")) return true;
  return Children.toArray(props.children).some(isMermaidBlock);
}

/* ---------------------------------------------------------------- images */

function toNumber(value: unknown): number | undefined {
  const n = typeof value === "string" ? Number.parseInt(value, 10) : value;
  return typeof n === "number" && Number.isFinite(n) && n > 0 ? n : undefined;
}

interface ArticleImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional cap on the rendered width, e.g. from an explicit width prop */
  maxWidth?: number;
  /** Eager-load (the post's lead image when it sits in the body) */
  priority?: boolean;
}

/**
 * A content image at its natural aspect ratio, never upscaled, and narrowed
 * when it would otherwise be taller than MAX_IMAGE_HEIGHT. Renders inline-safe
 * markup (spans) so it can sit inside a paragraph.
 */
function ArticleImage({
  src,
  alt,
  width,
  height,
  maxWidth,
  priority = false,
}: ArticleImageProps) {
  const display = Math.round(
    Math.min(
      ARTICLE_WIDTH,
      width,
      maxWidth ?? Number.POSITIVE_INFINITY,
      (MAX_IMAGE_HEIGHT * width) / height,
    ),
  );
  const sizes =
    display < 390 ? `${display}px` : `(min-width: 768px) ${display}px, 100vw`;

  return (
    <span className="article-image">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        priority={priority}
        loading={priority ? undefined : "lazy"}
        style={display < ARTICLE_WIDTH ? { maxWidth: display } : undefined}
      />
    </span>
  );
}

/** Markdown `![alt](src)` and raw-HTML <img>. Sizes come from rehype-image-size. */
export function MDXImg({
  src,
  alt = "",
  width,
  height,
  title: _title,
  priority,
  ...rest
}: ComponentPropsWithoutRef<"img"> & { priority?: boolean }) {
  const w = toNumber(width);
  const h = toNumber(height);
  if (typeof src === "string" && src.startsWith("/") && w && h) {
    return (
      <ArticleImage
        src={src}
        alt={alt}
        width={w}
        height={h}
        priority={priority}
      />
    );
  }
  return (
    // biome-ignore lint/performance/noImgElement: remote or unsized image, next/image can't size it
    <img
      {...rest}
      src={src}
      alt={alt}
      width={w}
      height={h}
      loading="lazy"
      decoding="async"
      className="article-image-fallback"
    />
  );
}

/** JSX <Image src alt width height /> used in older posts. */
export function MDXImage({
  src,
  alt = "",
  width,
  height,
  priority,
}: {
  src: string;
  alt?: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
}) {
  const intrinsic = getLocalImageSize(src);
  const authorWidth = toNumber(width);
  const authorHeight = toNumber(height);
  const size =
    intrinsic ??
    (authorWidth && authorHeight
      ? { width: authorWidth, height: authorHeight }
      : null);

  return (
    <figure className="article-figure">
      {size ? (
        <ArticleImage
          src={src}
          alt={alt}
          width={size.width}
          height={size.height}
          priority={priority}
        />
      ) : (
        <MDXImg src={src} alt={alt} />
      )}
      {alt && <figcaption>{alt}</figcaption>}
    </figure>
  );
}

/** A paragraph holding nothing but one image becomes a captioned figure. */
function createParagraph(imageComponent: unknown) {
  return function MDXParagraph({
    children,
    ...props
  }: ComponentPropsWithoutRef<"p">) {
    const items = Children.toArray(children).filter(
      (child) => !(typeof child === "string" && child.trim() === ""),
    );
    if (
      items.length === 1 &&
      isValidElement(items[0]) &&
      items[0].type === imageComponent
    ) {
      const alt = (items[0].props as { alt?: string }).alt;
      return (
        <figure className="article-figure">
          {items[0]}
          {alt && <figcaption>{alt}</figcaption>}
        </figure>
      );
    }
    return <p {...props}>{children}</p>;
  };
}

/* -------------------------------------------------------------- headings */

/**
 * Mouse-only permalink. The TOC gives keyboard and screen-reader users the
 * same jump, so this stays out of the a11y tree and the tab order (otherwise
 * every heading is announced twice).
 */
function HeadingAnchor({ id }: { id: string }) {
  // biome-ignore-start lint/a11y/useAnchorContent: intentionally hidden duplicate of the heading
  return (
    <a
      href={`#${id}`}
      className="heading-anchor"
      aria-hidden="true"
      tabIndex={-1}
    >
      #
    </a>
  );
  // biome-ignore-end lint/a11y/useAnchorContent: see above
}

function createHeading(Tag: "h2" | "h3") {
  function Heading({ id, children, ...props }: ComponentPropsWithoutRef<"h2">) {
    return (
      <Tag id={id} {...props}>
        {children}
        {id && <HeadingAnchor id={id} />}
      </Tag>
    );
  }
  Heading.displayName = `MDX${Tag.toUpperCase()}`;
  return Heading;
}

export const MDXH2 = createHeading("h2");
export const MDXH3 = createHeading("h3");

/* ----------------------------------------------------------------- links */

export function MDXLink({
  href = "",
  ...props
}: ComponentPropsWithoutRef<"a">) {
  if (href.startsWith("/")) {
    return <Link href={href} {...props} />;
  }
  if (href.startsWith("#")) {
    return <a href={href} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" {...props} />;
}

/* ------------------------------------------------------------------ code */

type DataProps = Record<string, unknown> & { children?: ReactNode };

/** rehype-pretty-code wraps every code block in a figure. */
export function MDXFigure(props: DataProps) {
  if (props["data-rehype-pretty-code-figure"] === undefined) {
    return <figure {...props} />;
  }
  if (isMermaidBlock(props.children as ReactNode)) {
    return <Mermaid chart={extractTextContent(props.children).trim()} />;
  }
  const hasTitle = Children.toArray(props.children).some(
    (child) =>
      isValidElement(child) &&
      (child.props as DataProps)["data-rehype-pretty-code-title"] !== undefined,
  );
  return (
    <figure
      {...props}
      className="code-block"
      data-has-title={hasTitle || undefined}
    >
      {props.children}
      <CodeCopyButton />
    </figure>
  );
}

export function MDXPre({
  children,
  ...props
}: ComponentPropsWithoutRef<"pre">) {
  if (isMermaidBlock(children)) {
    return <Mermaid chart={extractTextContent(children).trim()} />;
  }
  return <pre {...props}>{children}</pre>;
}

export function MDXCode({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<"code">) {
  if (className?.includes("language-mermaid")) {
    return <Mermaid chart={extractTextContent(children).trim()} />;
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

/** Catches the <div data-mermaid-chart> nodes produced by remark-mermaid. */
export function MDXDiv(props: DataProps) {
  if (props["data-mermaid-chart"] !== undefined) {
    const chart = extractTextContent(props.children)
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&amp;/g, "&");
    return <Mermaid chart={chart.trim()} />;
  }
  return <div {...props} />;
}

/* ---------------------------------------------------------------- tables */

export function MDXTable(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="table-scroll">
      <table {...props} />
    </div>
  );
}

const baseComponents = {
  a: MDXLink,
  h1: MDXH2,
  h2: MDXH2,
  h3: MDXH3,
  pre: MDXPre,
  code: MDXCode,
  figure: MDXFigure,
  div: MDXDiv,
  table: MDXTable,
};

/**
 * Component map for one post. `leadImage` (the post's frontmatter image) is
 * loaded eagerly when it appears in the body, since the page then skips the
 * hero and that image is usually the largest paint.
 */
export function createMdxComponents({
  leadImage,
}: {
  leadImage?: string;
} = {}) {
  const Img = (props: ComponentPropsWithoutRef<"img">) => (
    <MDXImg
      {...props}
      priority={Boolean(leadImage) && props.src === leadImage}
    />
  );
  const JsxImage = (props: Parameters<typeof MDXImage>[0]) => (
    <MDXImage
      {...props}
      priority={Boolean(leadImage) && props.src === leadImage}
    />
  );
  return {
    ...baseComponents,
    Image: JsxImage,
    img: Img,
    p: createParagraph(Img),
  };
}
