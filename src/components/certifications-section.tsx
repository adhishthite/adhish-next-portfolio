"use client";

import { useState } from "react";
import { MagicCard } from "@/components/ui/magic-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  url: string;
  iconUrl: string;
}

interface CertificationsSectionProps {
  certificates: readonly Certificate[];
}

const INITIAL_COUNT = 6;

export function CertificationsSection({
  certificates,
}: CertificationsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? certificates : certificates.slice(0, INITIAL_COUNT);

  const hasMore = certificates.length > INITIAL_COUNT;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visible.map((cert) => (
          <MagicCard
            key={cert.name + cert.date}
            className="p-6 rounded-2xl border border-border/40 hover:border-accent/50 transition-all duration-300"
            gradientColor="#5B122D"
            gradientColorDark="#d4a5a5"
            gradientOpacity={0.15}
          >
            <div className="space-y-4">
              {cert.iconUrl && (
                <Avatar className="size-10">
                  <AvatarImage alt={cert.issuer} src={cert.iconUrl} />
                  <AvatarFallback>{cert.issuer[0]}</AvatarFallback>
                </Avatar>
              )}
              <div className="space-y-2">
                <h3 className="font-heading font-semibold text-base leading-tight">
                  {cert.name}
                </h3>
                <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                <p className="text-xs text-muted-foreground">{cert.date}</p>
              </div>
              {cert.url && (
                <Link
                  href={cert.url}
                  className="inline-flex items-center text-xs text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Certificate →
                </Link>
              )}
            </div>
          </MagicCard>
        ))}
      </div>

      {hasMore && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setShowAll(!showAll)}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors px-6 py-2 border border-border/40 rounded-full hover:border-foreground/20"
          >
            {showAll
              ? "Show fewer"
              : `Show all ${certificates.length} certifications`}
          </button>
        </div>
      )}
    </>
  );
}
