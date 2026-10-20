import {
  ArrowLeft,
  ArrowRight,
  EnvelopeSimple,
} from "@phosphor-icons/react/ssr";
import Image from "next/image";
import Link from "next/link";
import { Icons } from "@/components/icons";
import type { BlogPost } from "@/data/blog";
import { CURRENT_ROLE, DATA } from "@/data/resume";
import { cn } from "@/lib/utils";

/**
 * Small round avatar. me.jpg is a 3:4 portrait where the head is under half
 * the frame, so at 32-56px it's zoomed in around the face.
 */
export function Avatar({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative block overflow-hidden rounded-full bg-secondary",
        className,
      )}
    >
      <Image
        src={DATA.avatarUrl}
        alt=""
        fill
        sizes="112px"
        className="object-cover"
        style={{
          objectPosition: "50% 0%",
          // Centres the face (head is turned left, so left of the hair)
          transform: "scale(1.7)",
          transformOrigin: "35% 57%",
        }}
      />
    </span>
  );
}

export function AuthorCard() {
  return (
    <section
      aria-label="About the author"
      className="flex gap-4 rounded-xl border border-border/70 bg-card p-5 shadow-[0_1px_2px_rgb(0_0_0/0.04)] sm:gap-5 sm:p-6"
    >
      <Avatar className="size-12 shrink-0 sm:size-14" />
      <div className="min-w-0 flex-1">
        <p className="font-medium">{DATA.name}</p>
        <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
          {CURRENT_ROLE.title} at {CURRENT_ROLE.company}. I write about agents,
          LLMs, and the tools I build. If this post was useful or wrong, I'd
          like to hear about it.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <a
            href={`mailto:${DATA.contact.email}`}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-foreground px-4 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            <EnvelopeSimple aria-hidden className="size-4" />
            Email me
          </a>
          <a
            href={DATA.contact.social.X.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full border border-border px-4 text-sm font-medium transition-colors hover:border-foreground/30 hover:bg-secondary"
          >
            <Icons.x aria-hidden className="size-3.5" />
            Message on X
          </a>
        </div>
      </div>
    </section>
  );
}

function AdjacentLink({
  post,
  direction,
}: {
  post: BlogPost;
  direction: "older" | "newer";
}) {
  const older = direction === "older";
  const Arrow = older ? ArrowLeft : ArrowRight;
  return (
    <Link
      href={`/blog/${post.slug}/`}
      rel={older ? "prev" : "next"}
      className={cn(
        "group flex flex-col gap-2 rounded-xl border border-border/70 p-5 transition-colors hover:border-foreground/20 hover:bg-card",
        !older && "sm:col-start-2 sm:items-end sm:text-right",
      )}
    >
      <span className="flex items-center gap-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">
        {!older && <span>Newer</span>}
        <Arrow
          aria-hidden
          className={cn(
            "size-3.5 transition-transform duration-300 group-hover:text-accent",
            older
              ? "group-hover:-translate-x-0.5"
              : "group-hover:translate-x-0.5",
          )}
        />
        {older && <span>Older</span>}
      </span>
      <span className="text-pretty text-[0.9375rem] font-medium leading-snug">
        {post.metadata.title}
      </span>
    </Link>
  );
}

export function PostNavigation({
  newer,
  older,
}: {
  newer: BlogPost | null;
  older: BlogPost | null;
}) {
  if (!newer && !older) return null;
  return (
    <nav aria-label="More posts" className="grid gap-3 sm:grid-cols-2">
      {older && <AdjacentLink post={older} direction="older" />}
      {newer && <AdjacentLink post={newer} direction="newer" />}
    </nav>
  );
}
