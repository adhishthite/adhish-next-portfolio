import type { Icon } from "@phosphor-icons/react";
import {
  Brain,
  Robot,
  Sparkle,
  TreeStructure,
} from "@phosphor-icons/react/ssr";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import { SectionHeading, sectionClass } from "./section-heading";

const ICONS: Record<string, Icon> = {
  "Enterprise AI Architecture": TreeStructure,
  "Agentic AI": Robot,
  "Generative AI & LLMs": Sparkle,
  "Machine Learning": Brain,
};

type Area = (typeof DATA.expertise)[number];

function ExpertiseCard({ area, primary }: { area: Area; primary: boolean }) {
  const Icon = ICONS[area.title] ?? Sparkle;

  return (
    <li className="flex flex-col rounded-xl border border-border/70 bg-card p-6 shadow-[0_1px_2px_rgb(0_0_0/0.04)] transition-colors duration-200 hover:border-foreground/20 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <span
          aria-hidden
          className="inline-flex size-10 items-center justify-center rounded-lg border border-border/70 bg-background text-foreground/80"
        >
          <Icon className="size-[22px]" weight="duotone" />
        </span>
        {primary ? (
          <span className="eyebrow inline-flex items-center gap-2">
            <span aria-hidden className="size-1.5 rounded-full bg-accent" />
            Primary focus
          </span>
        ) : null}
      </div>

      <h3 className="mt-6 font-serif text-[1.875rem] leading-[1.1] tracking-tight sm:text-[2.125rem]">
        {area.title}
      </h3>
      <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-muted-foreground">
        {area.summary}
      </p>

      {/* Every row carries a bottom hairline; the wrapper clips the last row's, whatever the column count */}
      <div className="mt-7 overflow-hidden border-t border-border/60 pt-3">
        <ul className="-mb-px grid gap-x-6 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
          {area.items.map((item) => (
            <li
              key={item}
              className="flex items-baseline gap-2.5 border-b border-border/40 py-2.5 text-[14.5px] leading-snug text-foreground/85"
            >
              <span
                aria-hidden
                className={cn(
                  "h-px w-2 shrink-0 translate-y-[-0.3em]",
                  primary ? "bg-accent/70" : "bg-foreground/30",
                )}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

export function Expertise() {
  return (
    <section aria-labelledby="expertise-title" className={sectionClass}>
      <SectionHeading
        id="expertise-title"
        anchor="expertise"
        label="Expertise"
        title="Architecture, agents, and production ML"
        intro="Enterprise AI architecture and agentic systems today, built on a decade of machine learning in production."
      />

      <ul className="grid gap-4 md:grid-cols-2 lg:gap-5">
        {DATA.expertise.map((area, index) => (
          <ExpertiseCard key={area.title} area={area} primary={index === 0} />
        ))}
      </ul>

      <div className="mt-16 grid gap-8 border-t border-border/60 pt-10 sm:mt-20 lg:grid-cols-[12rem_1fr] lg:gap-10">
        <h3 className="text-sm font-medium tracking-tight text-foreground">
          Tools &amp; platforms
        </h3>
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:gap-x-10 md:grid-cols-4">
          {DATA.skillGroups.map((group) => (
            <div key={group.label}>
              {/* Reserve two lines so lists start level when a label wraps on narrow screens */}
              <h4 className="eyebrow min-h-[2lh] sm:min-h-0">{group.label}</h4>
              <ul className="mt-3 space-y-1.5 text-[15px] text-foreground/85">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
