/**
 * URLs for generated Open Graph images. The route handlers live under
 * src/app/og/. Paths are relative; metadataBase in the root layout makes them
 * absolute.
 */
export function siteOgImage(): string {
  return "/og/site.png";
}

export function postOgImage(slug: string): string {
  return `/og/blog/${slug}.png`;
}
