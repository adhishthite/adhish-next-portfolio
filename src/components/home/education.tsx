import { ArrowUpRight, Plus } from "lucide-react";
import Image from "next/image";
import { DATA } from "@/data/resume";
import { SectionHeading, sectionClass } from "./section-heading";

type Certificate = (typeof DATA.certificates)[number];

const FEATURED = [
  "Deep Learning Specialization",
  "Triplebyte Certified Generalist Software Engineer",
  "Sequence Models",
  "Splunk Certified Knowledge Manager",
];

const featured = FEATURED.map((name) =>
  DATA.certificates.find((cert) => cert.name === name),
).filter((cert): cert is Certificate => cert !== undefined);

const rest = DATA.certificates.filter((cert) => !FEATURED.includes(cert.name));

const year = (date: string) => date.match(/\d{4}/)?.[0] ?? "";

type School = (typeof DATA.education)[number];

/**
 * Detailed raster crests turn into a blank tile at 32px, so these schools get
 * a serif monogram instead (the same fallback the experience list uses).
 */
const MONOGRAM_LOGOS = new Set<string>(["/unipune.jpg"]);

function SchoolMark({ school }: { school: School }) {
  const frame =
    "relative mt-0.5 flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md border border-border/70";

  if (MONOGRAM_LOGOS.has(school.logoUrl)) {
    return (
      <span aria-hidden className={`${frame} bg-secondary`}>
        <span className="font-serif text-base leading-none text-muted-foreground">
          {school.school.replace(/^University of /, "").charAt(0)}
        </span>
      </span>
    );
  }

  return (
    <span aria-hidden className={`${frame} bg-white`}>
      <Image
        src={school.logoUrl}
        alt=""
        width={32}
        height={32}
        className="size-full object-contain p-[10%]"
      />
    </span>
  );
}

function CertificateRow({ cert }: { cert: Certificate }) {
  const content = (
    <>
      <span className="text-[15px] leading-snug text-foreground">
        {cert.name}
        {cert.url ? (
          <ArrowUpRight
            aria-hidden
            className="ml-0.5 inline size-3.5 -translate-y-px text-muted-foreground opacity-60 transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-px group-hover:opacity-100"
            strokeWidth={1.75}
          />
        ) : null}
      </span>
      <span className="mt-1 block font-mono text-[11px] uppercase tracking-[0.08em] text-muted-foreground">
        {cert.issuer} · {year(cert.date)}
      </span>
    </>
  );

  return (
    <li className="border-t border-border/60 py-3.5 first:border-t-0">
      {cert.url ? (
        <a
          href={cert.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group block"
        >
          {content}
        </a>
      ) : (
        content
      )}
    </li>
  );
}

export function Education() {
  return (
    <section aria-labelledby="education-title" className={sectionClass}>
      <SectionHeading
        id="education-title"
        index="04"
        label="Education"
        title="Education & certifications"
      />

      <div className="grid gap-14 md:grid-cols-2 md:gap-10 lg:gap-16">
        <div>
          <h3 className="eyebrow border-b border-border/60 pb-3">Degrees</h3>
          <ul>
            {DATA.education.map((school) => (
              <li
                key={school.school}
                className="flex items-start gap-4 border-b border-border/60 py-5"
              >
                <SchoolMark school={school} />
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline justify-between gap-4">
                    <a
                      href={school.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="-my-2.5 py-2.5 text-[15px] font-medium tracking-tight decoration-accent/50 underline-offset-[5px] hover:underline"
                    >
                      {school.school}
                    </a>
                    <span className="shrink-0 font-mono text-xs tabular-nums text-muted-foreground">
                      {school.start} – {school.end}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {school.degree}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow border-b border-border/60 pb-3">
            Certifications
          </h3>
          <ul>
            {featured.map((cert) => (
              <CertificateRow key={cert.name} cert={cert} />
            ))}
          </ul>
          {rest.length > 0 ? (
            <details className="group/more border-t border-border/60">
              <summary className="-mx-2 flex cursor-pointer list-none items-center gap-2 rounded-md px-2 py-4 text-sm focus-visible:outline-offset-0 text-muted-foreground transition-colors hover:text-foreground [&::-webkit-details-marker]:hidden">
                <Plus
                  aria-hidden
                  className="size-4 transition-transform duration-200 group-open/more:rotate-45"
                  strokeWidth={1.75}
                />
                <span className="group-open/more:hidden">
                  Show all {DATA.certificates.length}
                </span>
                <span className="hidden group-open/more:inline">
                  Show fewer
                </span>
              </summary>
              <ul className="border-t border-border/60">
                {rest.map((cert) => (
                  <CertificateRow key={cert.name} cert={cert} />
                ))}
              </ul>
            </details>
          ) : null}
        </div>
      </div>
    </section>
  );
}
