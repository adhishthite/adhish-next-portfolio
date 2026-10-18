import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { SectionHeading, sectionClass } from "./section-heading";

type Project = (typeof DATA.projects)[number];

/**
 * Per-image fit for screenshots that don't suit a top-centre crop. The ocloc
 * card is a 2:1 GitHub preview on white, so it's shown whole on a white mat.
 */
const IMAGE_FIT: Record<string, string> = {
  "/blog/ocloc/github-preview.png": "object-contain bg-white",
};

function ProjectMedia({ project }: { project: Project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        fill
        sizes="(min-width: 1152px) 548px, (min-width: 768px) 46vw, 100vw"
        className={cn(
          "transition-transform duration-700 ease-out group-hover:scale-[1.02]",
          IMAGE_FIT[project.image] ?? "object-cover object-top",
        )}
      />
    );
  }

  // No screenshot: a typographic cover in the same frame
  return (
    <div className="absolute inset-0 flex flex-col justify-between p-6 transition-transform duration-700 ease-out group-hover:scale-[1.02] sm:p-8">
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

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col">
      <Link
        href={project.post}
        tabIndex={-1}
        aria-hidden
        className="relative block aspect-[16/10] overflow-hidden rounded-xl border border-border/70 bg-secondary shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-colors group-hover:border-foreground/20"
      >
        <ProjectMedia project={project} />
      </Link>

      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="text-lg font-medium tracking-tight">
          <Link
            href={project.post}
            className="decoration-accent/50 underline-offset-[5px] hover:underline"
          >
            {project.title}
          </Link>
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

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
        <Link
          href={project.post}
          className="group/link inline-flex items-center gap-1 font-medium text-foreground"
          aria-label={`Read the write-up on ${project.title}`}
        >
          Read the write-up
          <ArrowRight
            className="size-3.5 transition-transform duration-200 group-hover/link:translate-x-0.5"
            strokeWidth={1.75}
          />
        </Link>
        {project.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-0.5 text-muted-foreground transition-colors hover:text-foreground"
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
    <section
      id="projects"
      aria-labelledby="projects-title"
      className={sectionClass}
    >
      <SectionHeading
        id="projects-title"
        index="01"
        label="Selected work"
        title="Things I've built"
        intro="Side projects, mostly. Each one has a write-up on the blog."
      />
      <div className="grid gap-x-10 gap-y-16 md:grid-cols-2 lg:gap-x-12">
        {DATA.projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
      <div className="mt-14">
        <Link
          href="/blog/"
          className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          More on the blog
          <ArrowRight
            className="size-4 transition-transform duration-200 group-hover:translate-x-0.5"
            strokeWidth={1.75}
          />
        </Link>
      </div>
    </section>
  );
}
