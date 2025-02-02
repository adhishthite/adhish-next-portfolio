import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface Props {
  title: string;
  description: string;
  dates: string;
  location: string;
  image?: string;
  links?: readonly {
    icon: React.ReactNode;
    title: string;
    href: string;
  }[];
}

export function HackathonCard({
  title,
  description,
  dates,
  location,
  image,
  links,
}: Props) {
  return (
    <li className="relative ml-16 py-6 group">
      <div className="absolute -left-16 top-6 flex items-center justify-center">
        <Avatar className="size-12 border-2 border-muted">
          <AvatarImage src={image} alt={title} className="object-contain p-1" />
          <AvatarFallback>{title[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col space-y-2">
        {dates && (
          <time className="text-xs font-medium text-muted-foreground">{dates}</time>
        )}
        <div className="space-y-1">
          <h2 className="text-base font-semibold leading-snug">{title}</h2>
          {location && (
            <p className="text-sm text-muted-foreground">{location}</p>
          )}
        </div>
        {description && (
          <p className="prose dark:prose-invert text-sm text-muted-foreground leading-normal">
            {description}
          </p>
        )}
        {links && links.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {links?.map((link, idx) => (
              <Link
                href={link.href}
                key={idx}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Badge 
                  key={idx} 
                  title={link.title} 
                  className="flex items-center gap-1.5 transition-colors"
                >
                  {link.icon}
                  {link.title}
                </Badge>
              </Link>
            ))}
          </div>
        )}
      </div>
    </li>
  );
}
