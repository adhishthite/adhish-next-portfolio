import fs from "node:fs";
import path from "node:path";
import { imageSize } from "image-size";
import { visit } from "unist-util-visit";

export interface ImageDimensions {
  width: number;
  height: number;
}

interface HastElement {
  type: "element";
  tagName: string;
  properties?: Record<string, unknown>;
  children?: unknown[];
}

const PUBLIC_DIR = path.join(process.cwd(), "public");
const sizeCache = new Map<string, ImageDimensions | null>();

/**
 * Intrinsic size of an image under public/, e.g. "/blog/menustat/panel.png".
 * Returns null for remote URLs, missing files and formats image-size can't read.
 * JPEG EXIF rotation is applied so portrait photos report portrait dimensions.
 */
export function getLocalImageSize(src: unknown): ImageDimensions | null {
  if (typeof src !== "string" || !src.startsWith("/") || src.startsWith("//")) {
    return null;
  }

  let pathname: string;
  try {
    pathname = decodeURIComponent(src.split(/[?#]/)[0]);
  } catch {
    return null;
  }

  const cached = sizeCache.get(pathname);
  if (cached !== undefined) return cached;

  const file = path.join(PUBLIC_DIR, pathname);
  let result: ImageDimensions | null = null;
  if (file.startsWith(PUBLIC_DIR + path.sep)) {
    try {
      const { width, height, orientation } = imageSize(fs.readFileSync(file));
      if (width && height) {
        // EXIF orientations 5-8 are rotated 90 degrees
        const rotated = orientation !== undefined && orientation >= 5;
        result = rotated ? { width: height, height: width } : { width, height };
      }
    } catch {
      result = null;
    }
  }

  sizeCache.set(pathname, result);
  return result;
}

/**
 * Rehype plugin: give every local <img> its intrinsic width/height so the MDX
 * `img` component can render it through next/image without layout shift.
 * Run it after rehype-raw (so images written as raw HTML are included) and
 * before rehype-pretty-code.
 */
export function rehypeImageSize() {
  return (tree: unknown) => {
    visit(tree as Parameters<typeof visit>[0], "element", (node) => {
      const element = node as unknown as HastElement;
      if (element.tagName !== "img" || !element.properties) return;

      const size = getLocalImageSize(element.properties.src);
      if (!size) return;

      element.properties.width = size.width;
      element.properties.height = size.height;
    });
  };
}
