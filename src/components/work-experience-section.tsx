"use client";

import { useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { WorkExperienceModal } from "@/components/work-experience-modal";

interface WorkExperience {
  company: string;
  href?: string;
  badges?: readonly string[];
  location?: string;
  title: string;
  logoUrl?: string;
  start: string;
  end?: string;
  summary: string;
  description: string;
}

interface WorkExperienceSectionProps {
  work: readonly WorkExperience[];
}

export function WorkExperienceSection({ work }: WorkExperienceSectionProps) {
  const [selectedWork, setSelectedWork] = useState<WorkExperience | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleWorkClick = (workItem: WorkExperience) => {
    setSelectedWork(workItem);
    setModalOpen(true);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {work.map((workItem, idx) => (
          <button
            key={workItem.company}
            type="button"
            onClick={() => handleWorkClick(workItem)}
            className={`text-left ${idx === 0 ? "md:col-span-2" : ""}`}
          >
            <MagicCard
              className="p-6 cursor-pointer transition-all duration-300 hover:scale-[1.02] h-full rounded-2xl border border-border/40 hover:border-accent/50"
              gradientColor="#5B122D"
              gradientColorDark="#d4a5a5"
              gradientOpacity={0.15}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    {workItem.logoUrl && (
                      <Avatar className="size-12 border">
                        <AvatarImage
                          alt={workItem.company}
                          src={workItem.logoUrl}
                        />
                        <AvatarFallback>{workItem.company[0]}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <h3 className="font-heading font-semibold text-lg">
                        {workItem.company}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {workItem.title}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>
                    {workItem.start} - {workItem.end ?? "Present"}
                  </span>
                </div>

                {/* One-liner summary */}
                {workItem.summary && (
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                    {workItem.summary}
                  </p>
                )}

                {/* Click indicator */}
                <div className="flex items-center justify-end pt-2">
                  <span className="text-xs text-accent group-hover:underline">
                    Click to learn more →
                  </span>
                </div>
              </div>
              {idx === 0 && <BorderBeam size={250} duration={12} delay={9} />}
            </MagicCard>
          </button>
        ))}
      </div>

      <WorkExperienceModal
        work={selectedWork}
        open={modalOpen}
        onOpenChange={setModalOpen}
      />
    </>
  );
}
