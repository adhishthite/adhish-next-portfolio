"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollMask } from "@/components/ui/scroll-mask";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

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

interface WorkExperienceModalProps {
  work: WorkExperience | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WorkExperienceModal({
  work,
  open,
  onOpenChange,
}: WorkExperienceModalProps) {
  if (!work) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] p-0 overflow-hidden flex flex-col gap-0">
        <div className="p-6 pb-2 shrink-0">
          <DialogHeader>
            <div className="flex items-start gap-4 mb-4">
              {work.logoUrl && (
                <Avatar className="size-16 border">
                  <AvatarImage alt={work.company} src={work.logoUrl} />
                  <AvatarFallback>{work.company[0]}</AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1">
                <DialogTitle className="text-2xl font-heading font-bold mb-2">
                  {work.company}
                </DialogTitle>
                <DialogDescription className="text-base text-foreground/90">
                  {work.title}
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
        </div>

        <ScrollMask className="flex-1 min-h-0" fadeSize="24px">
          <div className="space-y-6 p-6 pt-2">
            {/* Timeline & Location */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground pb-4 border-b border-border/40">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">Duration:</span>
                <span>
                  {work.start} - {work.end ?? "Present"}
                </span>
              </div>
              {work.location && (
                <>
                  <span>•</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-foreground">Location:</span>
                    <span>{work.location}</span>
                  </div>
                </>
              )}
            </div>

            {/* Badges */}
            {work.badges && work.badges.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {work.badges.map((badge) => (
                  <Badge
                    key={badge}
                    variant="secondary"
                    className="text-xs font-medium"
                  >
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="space-y-3">
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground font-medium">
                Responsibilities & Achievements
              </h3>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="text-foreground/90 leading-relaxed whitespace-pre-line">
                  {work.description}
                </div>
              </div>
            </div>

            {/* Company Link */}
            {work.href && (
              <div className="pt-4 border-t border-border/40">
                <Link
                  href={work.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
                >
                  Visit {work.company}
                  <ExternalLink className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>
        </ScrollMask>
      </DialogContent>
    </Dialog>
  );
}
