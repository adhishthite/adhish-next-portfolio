import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/ssr";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="container-page flex min-h-[calc(100dvh-16rem)] flex-col justify-center py-24 sm:py-32">
      <div className="max-w-2xl">
        <p className="eyebrow animate-rise flex items-center gap-2.5">
          <span aria-hidden className="size-1.5 rounded-full bg-accent" />
          404
        </p>
        <h1
          className="animate-rise-soft mt-6 font-serif text-5xl leading-[1.02] tracking-tight sm:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          There&rsquo;s no page <em className="italic">here.</em>
        </h1>
        <p
          className="animate-rise mt-6 max-w-md text-[17px] leading-relaxed text-muted-foreground"
          style={{ animationDelay: "160ms" }}
        >
          The link may be out of date, or the page has moved.
        </p>
        <div
          className="animate-rise mt-10 flex flex-wrap items-center gap-3"
          style={{ animationDelay: "240ms" }}
        >
          <Link
            href="/"
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
          >
            <ArrowLeft
              aria-hidden
              className="size-4 transition-transform group-hover:-translate-x-0.5"
            />
            Back home
          </Link>
          <Link
            href="/blog/"
            className="group inline-flex h-11 items-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition-colors hover:border-foreground/30"
          >
            Read the writing
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </main>
  );
}
