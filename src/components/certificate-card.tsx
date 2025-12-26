import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Icons } from "./icons";

interface Props {
  name: string;
  issuer: string;
  date: string;
  url?: string;
  iconUrl?: string;
}

export function CertificateCard({ name, issuer, date, url, iconUrl }: Props) {
  return (
    <li className="relative ml-16 py-6 group">
      <div className="absolute -left-16 top-6 flex items-center justify-center">
        <Avatar className="size-12 border-2 border-muted">
          <AvatarImage
            src={iconUrl ?? `/${issuer.toLowerCase()}.svg`}
            alt={issuer}
            className="object-contain p-1"
          />
          <AvatarFallback>{issuer[0]}</AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col space-y-2">
        <time className="text-xs font-medium text-muted-foreground">
          {date}
        </time>
        <div className="space-y-1">
          <h2 className="text-base font-semibold leading-snug">{name}</h2>
          <p className="text-sm text-muted-foreground">{issuer}</p>
        </div>
        {url && (
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <Link href={url} target="_blank" rel="noopener noreferrer">
              <Badge
                title="View Certificate"
                className="flex items-center gap-1.5 transition-colors"
              >
                <Icons.globe className="size-3" />
                View Certificate
              </Badge>
            </Link>
          </div>
        )}
      </div>
    </li>
  );
}
