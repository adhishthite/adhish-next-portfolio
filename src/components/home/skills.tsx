import { DATA } from "@/data/resume";
import { SectionHeading, sectionClass } from "./section-heading";

export function Skills() {
  return (
    <section aria-labelledby="skills-title" className={sectionClass}>
      <SectionHeading
        id="skills-title"
        index="03"
        label="Skills"
        title="Tools of the trade"
      />

      <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 lg:grid-cols-4">
        {DATA.skillGroups.map((group) => (
          <div key={group.label} className="border-t border-border/60 pt-5">
            {/* Reserve two lines so lists start level when a label wraps on narrow screens */}
            <h3 className="eyebrow min-h-[2lh] sm:min-h-0">{group.label}</h3>
            <ul className="mt-4 space-y-1.5 text-[15px] text-foreground/85">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
