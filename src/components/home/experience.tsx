import { DATA } from "@/data/resume";
import { type ExperienceEntry, ExperienceItem } from "./experience-item";
import { SectionHeading, sectionClass } from "./section-heading";

const isEarlyRole = (entry: { badges: readonly string[] }) =>
  entry.badges.some(
    (badge) => badge === "Internship" || badge === "Assistantship",
  );

const roles: ExperienceEntry[] = DATA.work.filter((w) => !isEarlyRole(w));
const earlyRoles: ExperienceEntry[] = DATA.work.filter(isEarlyRole);

export function Experience() {
  return (
    <section aria-labelledby="work-title" className={sectionClass}>
      <SectionHeading
        id="work-title"
        anchor="work"
        index="02"
        label="Experience"
        title="Where I've worked"
      />

      <ul className="border-y border-border/60">
        {roles.map((entry, index) => (
          <ExperienceItem
            key={`${entry.company}-${entry.start}`}
            entry={entry}
            defaultOpen={index === 0}
          />
        ))}
      </ul>

      {earlyRoles.length > 0 ? (
        <div className="mt-12">
          <h3 className="eyebrow mb-3">Internships &amp; research</h3>
          <ul className="border-y border-border/60">
            {earlyRoles.map((entry) => (
              <ExperienceItem
                key={`${entry.company}-${entry.start}`}
                entry={entry}
                compact
              />
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
