import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { SectionHeading, sectionClass } from "./section-heading";

type Project = (typeof DATA.projects)[number];

/**
 * Per-image fit for screenshots that don't suit a plain top-centre crop. The
 * GlucoWise landing page is a tall full-page capture; a 3% zoom from the top
 * ends the crop in the gap above "Product pillars" instead of mid-heading.
 */
const IMAGE_FIT: Record<string, string> = {
  "/blog/glucowise/landing-page.png":
    "object-cover object-top origin-top scale-[1.03] group-hover:scale-[1.045]",
};

/** Typographic covers for projects without a screenshot, varied per project */
type CoverStyle = "grid" | "ruled";
const COVER_STYLE: Record<string, CoverStyle> = {
  // A lines-of-code counter, so its cover is a page of numbered lines
  ocloc: "ruled",
};

const coverFrame =
  "absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.02]";

function GridCover({ project }: { project: Project }) {
  return (
    <div className={cn(coverFrame, "flex flex-col justify-between p-6 sm:p-8")}>
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.6)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.6)_1px,transparent_1px)] bg-[size:28px_28px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
      />
      <span className="relative font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
        {project.tags.join(" / ")}
      </span>
      <span className="relative font-serif text-5xl leading-none tracking-tight sm:text-6xl">
        {project.title}
        <span className="text-accent">.</span>
      </span>
    </div>
  );
}

const RULED_LINES = Array.from({ length: 16 }, (_, i) => i + 1);

/** Install commands quoted from the project READMEs/posts */
const INSTALL: Record<string, string> = {
  ocloc: "cargo install ocloc",
};

function RuledCover({ project }: { project: Project }) {
  const install = INSTALL[project.title];
  return (
    <div className={cn(coverFrame, "overflow-hidden")}>
      {/* Ruled lines with a line-number gutter, fading out to the right */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_27px,hsl(var(--border)/0.7)_27px)] bg-[size:100%_28px] [mask-image:linear-gradient(to_right,black_35%,transparent_95%)]"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-11 w-px bg-accent/30 sm:left-14"
      />
      <ol
        aria-hidden
        className="absolute left-0 top-0 w-11 font-mono text-[10px] leading-[28px] tabular-nums text-muted-foreground/50 sm:w-14"
      >
        {RULED_LINES.map((n) => (
          <li key={n} className="pr-3 text-right">
            {n}
          </li>
        ))}
      </ol>
      {/* Everything sits on the 28px rows: tags on row 2, title on rows 3-4, command on row 6 */}
      <div className="absolute inset-y-0 left-11 right-0 pl-5 pr-6 pt-7 sm:left-14 sm:pl-6 sm:pr-8">
        <span className="block font-mono text-[11px] uppercase leading-7 tracking-[0.16em] text-muted-foreground">
          {project.tags.join(" / ")}
        </span>
        <span className="block font-serif text-5xl leading-[56px] tracking-tight sm:text-6xl sm:leading-[56px]">
          {project.title}
          <span className="text-accent">.</span>
        </span>
        {install ? (
          <span className="mt-7 block font-mono text-xs leading-7 text-muted-foreground">
            <span className="text-accent">$</span> {install}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        fill
        sizes="(min-width: 1152px) 548px, (min-width: 768px) 46vw, 100vw"
        className={cn(
          "object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]",
          IMAGE_FIT[project.image],
        )}
      />
    );
  }

  // No screenshot: a typographic cover in the same frame
  return COVER_STYLE[project.title] === "ruled" ? (
    <RuledCover project={project} />
  ) : (
    <GridCover project={project} />
  );
}

function ProjectCard({ project }: { project: Project }) {
  // The first link is the project itself (live site or repo)
  const [primary, ...secondary] = project.links;

  return (
    <article className="group flex flex-col">
      {/* Duplicate of the title link for pointer users; hidden from keyboard and screen readers */}
      <Link
        href={primary.href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-border/70 bg-secondary shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-colors group-hover:border-foreground/20"
      >
        <ProjectMedia project={project} />
      </Link>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight">
          <a
            href={primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/title inline-flex items-baseline gap-1 decoration-accent/50 underline-offset-[5px] hover:underline"
          >
            {project.title}
            <ArrowUpRight
              aria-hidden
              className="size-4 self-center text-muted-foreground transition-all duration-200 group-hover/title:-translate-y-px group-hover/title:translate-x-px group-hover/title:text-foreground"
              strokeWidth={1.75}
            />
          </a>
        </h3>
        <span className="font-mono text-xs tabular-nums text-muted-foreground">
          {project.year}
        </span>
      </div>

      <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-muted-foreground">
        {project.description}
      </p>

      <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Built with">
        {project.tags.map((tag) => (
          <li
            key={tag}
            className="rounded-full border border-border/80 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
          >
            {tag}
          </li>
        ))}
      </ul>

      {/* 40px-tall links; the negative bottom margin keeps the row visually tight */}
      <div className="-mb-2.5 mt-2.5 flex flex-wrap items-center gap-x-5 text-sm">
        {[primary, ...secondary].map((link, i) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "group/link inline-flex min-h-10 items-center gap-0.5 transition-colors",
              i === 0
                ? "font-medium text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {link.label}
            <ArrowUpRight
              className="size-3.5 opacity-60 transition-all duration-200 group-hover/link:-translate-y-px group-hover/link:translate-x-px group-hover/link:opacity-100"
              strokeWidth={1.75}
            />
          </a>
        ))}
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section aria-labelledby="projects-title" className={sectionClass}>
      <SectionHeading
        id="projects-title"
        anchor="projects"
        index="01"
        label="Selected work"
        title="Things I've built"
        intro="Side projects I've shipped outside work."
      />
      <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:gap-x-12">
        {DATA.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
