import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { MEDIUM_PROFILE_URL } from "@/data/medium";
import { CURRENT_ROLE, DATA } from "@/data/resume";

const links = [
  { label: "GitHub", href: DATA.contact.social.GitHub.url },
  { label: "LinkedIn", href: DATA.contact.social.LinkedIn.url },
  { label: "X", href: DATA.contact.social.X.url },
  { label: "Medium", href: MEDIUM_PROFILE_URL },
  { label: "RSS", href: "/rss.xml" },
];

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border/60">
      <div className="container-page flex flex-col gap-10 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col items-start gap-3">
          <p className="font-serif text-2xl tracking-tight">{DATA.name}</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            {CURRENT_ROLE.title} at {CURRENT_ROLE.company}. Based in{" "}
            {DATA.location}.
          </p>
          <a
            href={`mailto:${DATA.contact.email}`}
            className="link-underline -my-2.5 inline-flex min-h-10 items-center text-sm"
          >
            {DATA.contact.email}
          </a>
        </div>

        <div className="flex flex-col gap-6 sm:items-end">
          <ul className="-my-2.5 flex flex-wrap gap-x-5 text-sm">
            {links.map((link) => {
              const external = link.href.startsWith("http");
              return (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    {...(external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group inline-flex min-h-10 items-center gap-0.5 text-muted-foreground transition-colors hover:text-foreground"
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
            © {new Date().getFullYear()} {DATA.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
