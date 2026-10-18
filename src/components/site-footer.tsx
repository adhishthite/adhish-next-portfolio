import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CURRENT_ROLE, DATA } from "@/data/resume";

const links = [
  { label: "GitHub", href: DATA.contact.social.GitHub.url },
  { label: "LinkedIn", href: DATA.contact.social.LinkedIn.url },
  { label: "X", href: DATA.contact.social.X.url },
  { label: "RSS", href: "/rss.xml" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="container-page flex flex-col gap-10 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-3">
          <p className="font-serif text-2xl tracking-tight">{DATA.name}</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            {CURRENT_ROLE.title} at {CURRENT_ROLE.company}. Based in{" "}
            {DATA.location}.
          </p>
          <a
            href={`mailto:${DATA.contact.email}`}
            className="link-underline inline-block text-sm"
          >
            {DATA.contact.email}
          </a>
        </div>

        <div className="flex flex-col gap-6 sm:items-end">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
            {links.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex items-center gap-0.5 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                    <ArrowUpRight
                      className="size-3.5 opacity-50 transition-all group-hover:-translate-y-px group-hover:translate-x-px group-hover:opacity-100"
                      strokeWidth={1.75}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
            © {new Date().getFullYear()} · Built with Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
