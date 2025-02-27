"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface ResumeCardProps {
  logoUrl: string;
  altText: string;
  title: string;
  subtitle?: string;
  href?: string;
  badges?: readonly string[];
  period: string;
  description?: string;
  location?: string;
}
export const ResumeCard = ({
  logoUrl,
  altText,
  title,
  subtitle,
  href,
  badges,
  period,
  description,
  location,
}: ResumeCardProps) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (description) {
      e.preventDefault();
      setIsExpanded(!isExpanded);
    }
  };

  return (
    <Link
      href={href || "#"}
      className="block cursor-pointer group/card"
      onClick={handleClick}
    >
      <Card className="flex p-4 group-hover/card:border-primary/50 transition-all duration-300">
        <div className="flex-none pt-1">
          <Avatar className="border size-12 bg-muted-background dark:bg-foreground">
            <AvatarImage
              src={logoUrl}
              alt={altText}
              className="object-contain"
            />
            <AvatarFallback>{altText[0]}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex-grow ml-4 min-w-0">
          <CardHeader className="p-0">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-x-4 gap-y-1 text-base">
              <div className="flex flex-col gap-1 min-w-0">
                <h3 className="inline-flex items-center gap-1 font-semibold leading-none text-xs sm:text-sm truncate">
                  {title}
                  <ChevronRightIcon
                    className={cn(
                      "size-4 transform transition-all duration-300 ease-out shrink-0",
                      isExpanded ? "rotate-90 opacity-100" : "opacity-0 group-hover/card:opacity-100 group-hover/card:translate-x-1"
                    )}
                  />
                </h3>
                {badges && (
                  <div className="flex flex-wrap gap-1">
                    {badges.map((badge, index) => (
                      <Badge
                        variant="secondary"
                        className="text-xs"
                        key={index}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-xs sm:text-sm tabular-nums text-muted-foreground shrink-0">
                {period}
              </div>
            </div>
            {subtitle && (
              <div className="font-sans text-sm font-semibold text-muted-foreground mt-1">
                {subtitle}
              </div>
            )}
            {location && (
              <div className="font-sans text-xs italic text-muted-foreground mt-1">
                {location}
              </div>
            )}
          </CardHeader>
          {description && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: isExpanded ? 1 : 0,
                height: isExpanded ? "auto" : 0,
              }}
              transition={{
                duration: 0.7,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mt-3 text-xs sm:text-sm text-muted-foreground"
            >
              {description.split('\n').map((line, index) => (
                <p key={index} className="mb-1.5">{line}</p>
              ))}
            </motion.div>
          )}
        </div>
      </Card>
    </Link>
  );
};
