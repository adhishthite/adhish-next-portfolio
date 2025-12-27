import Navbar from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Space_Grotesk, Outfit } from "next/font/google";
import "./globals.css";
import { DotPattern } from "@/components/ui/dot-pattern";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";

const fontHeading = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
});

const fontSans = Outfit({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: DATA.avatarUrl,
        width: 400,
        height: 400,
        alt: DATA.name,
      },
    ],
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
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y62X0MYQ59"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y62X0MYQ59');
          `}
        </Script>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: DATA.name,
              url: DATA.url,
              image: `${DATA.url}${DATA.avatarUrl}`,
              sameAs: [
                DATA.contact.social.GitHub.url,
                DATA.contact.social.LinkedIn.url,
                DATA.contact.social.X.url,
              ],
              jobTitle: "Lead AI Engineer",
              worksFor: {
                "@type": "Organization",
                name: "Elastic Co.",
              },
              alumniOf: [
                {
                  "@type": "EducationalOrganization",
                  name: "University of North Carolina at Charlotte",
                },
                {
                  "@type": "EducationalOrganization",
                  name: "University of Pune",
                },
              ],
              knowsAbout: [
                "Artificial Intelligence",
                "Machine Learning",
                "Deep Learning",
                "Python",
              ],
            }),
          }}
        />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased relative",
          fontSans.variable,
          fontHeading.variable,
        )}
      >
        <div className="absolute inset-0 -z-10 h-full w-full">
          <DotPattern
            width={40}
            height={40}
            cx={1}
            cy={1}
            cr={1}
            className="fill-neutral-300/70 dark:fill-neutral-700/70"
          />
        </div>
        <div className="max-w-5xl mx-auto py-12 sm:py-24 px-6">
          <ThemeProvider attribute="class" defaultTheme="light">
            <TooltipProvider delayDuration={0}>
              {children}
              <Navbar />
            </TooltipProvider>
          </ThemeProvider>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
