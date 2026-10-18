import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { DATA } from "@/data/resume";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${DATA.name}, home`}
        >
          <span
            aria-hidden
            className="size-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125"
          />
          <span className="font-serif text-[22px] leading-none tracking-tight">
            {DATA.name}
          </span>
        </Link>

        <nav aria-label="Main" className="flex items-center gap-1 text-sm">
          {DATA.navbar.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground ${
                item.href.startsWith("/#") ? "hidden sm:inline-flex" : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full px-3 py-1.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            Résumé
          </a>
          <span aria-hidden className="mx-1 h-4 w-px bg-border" />
          <ModeToggle />
        </nav>
      </div>
    </header>
  );
}
