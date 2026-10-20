import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import { DATA } from "@/data/resume";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container-page flex h-16 items-center justify-between gap-4 sm:gap-6">
        <Link
          href="/"
          className="group flex h-10 items-center gap-2.5"
          aria-label={`${DATA.name}, home`}
        >
          <span
            aria-hidden
            className="size-2 rounded-full bg-accent transition-transform duration-300 group-hover:scale-125"
          />
          <span className="whitespace-nowrap font-serif text-[1.375rem] leading-none tracking-tight">
            {DATA.name}
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="flex items-center gap-0.5 text-sm sm:gap-1"
        >
          {DATA.navbar.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`h-10 items-center rounded-full px-2 text-muted-foreground sm:px-3 transition-colors hover:text-foreground ${
                item.href.startsWith("/#")
                  ? "hidden sm:inline-flex"
                  : "inline-flex"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center rounded-full px-2 text-muted-foreground sm:px-3 transition-colors hover:text-foreground"
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
