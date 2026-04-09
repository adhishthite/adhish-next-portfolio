"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion } from "motion/react";

import { MagicCard } from "@/components/ui/magic-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Certificate {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  iconUrl?: string;
}

interface CertificationsGridProps {
  certificates: readonly Certificate[];
}

function getCollapsedCount(width: number) {
  if (width >= 1024) return 6;
  if (width >= 768) return 4;
  return 2;
}

export function CertificationsGrid({ certificates }: CertificationsGridProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [collapsedCount, setCollapsedCount] = useState(6);

  useEffect(() => {
    const updateCollapsedCount = () => {
      setCollapsedCount(getCollapsedCount(window.innerWidth));
    };

    updateCollapsedCount();
    window.addEventListener("resize", updateCollapsedCount);

    return () => {
      window.removeEventListener("resize", updateCollapsedCount);
    };
  }, []);

  const visibleCertificates = isExpanded
    ? certificates
    : certificates.slice(0, collapsedCount);
  const hasOverflow = certificates.length > collapsedCount;

  return (
    <div className="space-y-8">
      <motion.div
        layout
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {visibleCertificates.map((cert) => (
          <motion.div
            key={cert.name + cert.date}
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="h-full"
          >
            <MagicCard
              className="h-full rounded-2xl border border-border/40 p-6 transition-all duration-300 hover:border-accent/50"
              gradientColor="oklch(var(--card-glow))"
              gradientColorDark="oklch(var(--card-glow-dark))"
              gradientOpacity={0.15}
            >
              <div className="flex h-full flex-col">
                {cert.iconUrl && (
                  <Avatar className="size-10">
                    <AvatarImage alt={cert.issuer} src={cert.iconUrl} />
                    <AvatarFallback>{cert.issuer[0]}</AvatarFallback>
                  </Avatar>
                )}
                <div className="mt-4 space-y-2">
                  <h3 className="line-clamp-3 min-h-[4.5rem] font-heading text-base font-semibold leading-tight">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-xs text-muted-foreground">{cert.date}</p>
                </div>
                {cert.url && (
                  <Link
                    href={cert.url}
                    className="mt-auto inline-flex items-center pt-4 text-xs text-accent hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Certificate →
                  </Link>
                )}
              </div>
            </MagicCard>
          </motion.div>
        ))}
      </motion.div>

      {hasOverflow && (
        <div className="flex justify-center">
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => setIsExpanded((value) => !value)}
            className="inline-flex items-center gap-2 rounded-full border border-border/50 bg-background/70 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            {isExpanded ? "Show less" : "View all certifications"}
            <motion.span
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <ChevronDown className="size-4" />
            </motion.span>
          </motion.button>
        </div>
      )}
    </div>
  );
}
