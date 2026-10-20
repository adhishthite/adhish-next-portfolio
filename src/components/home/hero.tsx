import { ArrowUpRight, EnvelopeSimple } from "@phosphor-icons/react/ssr";
import Image from "next/image";
import { Icons } from "@/components/icons";
import { CURRENT_ROLE, DATA, YEARS_OF_EXPERIENCE } from "@/data/resume";

const socials = [
  { label: "GitHub", href: DATA.contact.social.GitHub.url, Icon: Icons.github },
  {
    label: "LinkedIn",
    href: DATA.contact.social.LinkedIn.url,
    Icon: Icons.linkedin,
  },
  { label: "X", href: DATA.contact.social.X.url, Icon: Icons.x },
];

const facts = [
  { term: "Based in", value: DATA.location },
  { term: "Experience", value: `${YEARS_OF_EXPERIENCE}+ years` },
  { term: "Focus", value: "Enterprise & Agentic AI" },
];

const rise = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="container-page pb-10 pt-10 sm:pt-20 lg:pt-24"
    >
      <div className="grid items-start gap-8 md:grid-cols-12 md:gap-12 lg:gap-16">
        <div className="md:col-span-7 lg:col-span-8">
          <h1
            className="animate-rise-soft font-serif text-[3.75rem] leading-[0.95] tracking-display sm:text-7xl lg:text-[6.5rem]"
            style={rise(80)}
          >
            {DATA.name}
          </h1>

          <p
            className="animate-rise mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-lg leading-snug text-foreground sm:text-xl"
            style={rise(140)}
          >
            <span className="eyebrow inline-flex items-center gap-2 self-center">
              <span aria-hidden className="size-1.5 rounded-full bg-accent" />
              Currently
            </span>
            <span>
              {CURRENT_ROLE.title}{" "}
              <span className="text-muted-foreground">at</span>{" "}
              <a
                href={CURRENT_ROLE.href}
                target="_blank"
                rel="noopener noreferrer"
                className="link-underline"
              >
                {CURRENT_ROLE.company}
              </a>
            </span>
          </p>

          <p
            className="animate-rise-soft mt-6 max-w-[60ch] text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]"
            style={rise(200)}
          >
            {DATA.summary}
          </p>

          <div
            className="animate-rise mt-9 flex flex-wrap items-center gap-3"
            style={rise(260)}
          >
            <a
              href={`mailto:${DATA.contact.email}`}
              className="inline-flex h-11 items-center gap-2 rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
            >
              <EnvelopeSimple className="size-4" aria-hidden />
              Email me
            </a>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex h-11 items-center gap-1.5 rounded-full border border-border bg-background/60 px-5 text-sm font-medium transition-colors hover:border-foreground/30"
            >
              Résumé
              <ArrowUpRight
                className="size-4 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"
                aria-hidden
              />
            </a>
            {/* Divider + icons wrap as one group; the divider only shows once they share a row with the buttons */}
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                className="mx-1 hidden h-5 w-px bg-border lg:block"
              />
              <ul className="-ml-2.5 flex items-center gap-0.5 lg:ml-0">
                {socials.map(({ label, href, Icon }) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                    >
                      <Icon className="size-5" aria-hidden />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <dl
            className="animate-rise mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-5 border-t border-border/60 pt-6 lg:grid-cols-3"
            style={rise(320)}
          >
            {facts.map((fact) => (
              <div
                key={fact.term}
                className="last:col-span-2 lg:last:col-span-1"
              >
                <dt className="eyebrow">{fact.term}</dt>
                <dd className="mt-1.5 text-sm text-foreground">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Portrait: a small thumbnail above the name on mobile, a full column on desktop */}
        <figure
          className="animate-rise-soft order-first w-[5.25rem] md:order-none md:col-span-5 md:w-auto lg:col-span-4"
          style={rise(0)}
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-lg border md:rounded-xl border-border/70 bg-muted shadow-[0_1px_2px_rgb(0_0_0/0.04)]">
            <Image
              src={DATA.avatarUrl}
              alt={`Portrait of ${DATA.name}`}
              fill
              priority
              sizes="(min-width: 1152px) 340px, (min-width: 768px) 40vw, 84px"
              className="object-cover"
            />
          </div>
        </figure>
      </div>
    </section>
  );
}
