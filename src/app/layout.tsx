import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Script from "next/script";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ThemeProvider } from "@/components/theme-provider";
import { MEDIUM_PROFILE_URL } from "@/data/medium";
import { CURRENT_ROLE, DATA } from "@/data/resume";
import { siteOgImage } from "@/lib/og";
import { cn } from "@/lib/utils";
import "./globals.css";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const fontSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
});

const siteTitle = `${DATA.name} · ${CURRENT_ROLE.title}`;

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: siteTitle,
    template: `%s · ${DATA.name}`,
  },
  description: DATA.description,
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": [{ url: "/rss.xml", title: `${DATA.name}` }],
    },
  },
  openGraph: {
    title: siteTitle,
    description: DATA.description,
    url: DATA.url,
    siteName: DATA.name,
    locale: "en_US",
    type: "website",
    images: [{ url: siteOgImage(), width: 1200, height: 630, alt: DATA.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: DATA.description,
    creator: "@xadhish",
    images: [siteOgImage()],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fbfaf8" },
    { media: "(prefers-color-scheme: dark)", color: "#100f0e" },
  ],
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: DATA.name,
  url: DATA.url,
  image: `${DATA.url}${DATA.avatarUrl}`,
  sameAs: [
    DATA.contact.social.GitHub.url,
    DATA.contact.social.LinkedIn.url,
    DATA.contact.social.X.url,
    MEDIUM_PROFILE_URL,
  ],
  jobTitle: CURRENT_ROLE.title,
  worksFor: { "@type": "Organization", name: CURRENT_ROLE.company },
  alumniOf: DATA.education.map((school) => ({
    "@type": "EducationalOrganization",
    name: school.school,
  })),
  knowsAbout: DATA.expertise.map((area) => area.title),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className={cn(
          "relative min-h-dvh bg-background font-sans",
          fontSans.variable,
          fontMono.variable,
          fontSerif.variable,
        )}
      >
        <div
          aria-hidden
          className="grain pointer-events-none fixed inset-0 -z-10"
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
          >
            Skip to content
          </a>
          <SiteHeader />
          <div id="main">{children}</div>
          <SiteFooter />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
