import { readFile } from "node:fs/promises";
import path from "node:path";
import { DATA } from "@/data/resume";

/** Shared pieces for the generated Open Graph cards (1200×630). */

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_COLORS = {
  paper: "#fbfaf8",
  ink: "#181715",
  muted: "#6b6964",
  rule: "#e3e0da",
  accent: "#c8381c",
} as const;

export const DOMAIN = new URL(DATA.url).hostname.replace(/^www\./, "");

const FONT_DIR = path.join(process.cwd(), "src/assets/fonts");

type OgFont = {
  name: string;
  data: Buffer;
  weight: 400 | 500;
  style: "normal" | "italic";
};

async function font(
  file: string,
  name: string,
  weight: 400 | 500,
  style: "normal" | "italic" = "normal",
): Promise<OgFont> {
  return {
    name,
    data: await readFile(path.join(FONT_DIR, file)),
    weight,
    style,
  };
}

export function loadOgFonts(): Promise<OgFont[]> {
  return Promise.all([
    font("InstrumentSerif-Regular.woff", "Instrument Serif", 400),
    font("InstrumentSerif-Italic.woff", "Instrument Serif", 400, "italic"),
    font("Geist-Regular.woff", "Geist", 400),
    font("Geist-Medium.woff", "Geist", 500),
    font("GeistMono-Regular.woff", "Geist Mono", 400),
  ]);
}

/** Small vermilion dot, the same mark the site header uses. */
export function AccentDot({ size = 14 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: size,
        backgroundColor: OG_COLORS.accent,
      }}
    />
  );
}

/** Mono, uppercase, tracked label. */
export function MonoLabel({
  children,
  color = OG_COLORS.muted,
}: {
  children: React.ReactNode;
  color?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Geist Mono",
        fontSize: 22,
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color,
      }}
    >
      {children}
    </div>
  );
}
