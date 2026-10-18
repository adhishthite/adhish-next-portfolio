import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { anchorClass, SectionEyebrow, sectionClass } from "./section-heading";

export function Contact() {
  return (
    <section
      aria-labelledby="contact-title"
      className={cn(sectionClass, "pb-8 sm:pb-8")}
    >
      <div id="contact" className={cn("max-w-3xl", anchorClass)}>
        <SectionEyebrow index="06" label="Contact" />
        <h2
          id="contact-title"
          className="mt-5 text-balance font-serif text-5xl leading-[1.02] tracking-display sm:text-6xl lg:text-7xl"
        >
          Have something in <em className="italic">mind?</em>
        </h2>
        <p className="mt-6 max-w-[52ch] text-base leading-relaxed text-muted-foreground sm:text-[17px]">
          Email is the best way to reach me. A DM on{" "}
          <a
            href={DATA.contact.social.X.url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline text-foreground"
          >
            X
          </a>{" "}
          works too.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <a
            href={`mailto:${DATA.contact.email}`}
            className="inline-flex h-11 items-center rounded-full bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-85"
          >
            Email me
          </a>
          <span className="font-mono text-[13px] text-muted-foreground">
            {DATA.contact.email}
          </span>
        </div>
      </div>
    </section>
  );
}
