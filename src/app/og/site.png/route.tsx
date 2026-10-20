import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { CURRENT_ROLE, DATA } from "@/data/resume";
import {
  AccentDot,
  DOMAIN,
  loadOgFonts,
  MonoLabel,
  OG_COLORS,
  OG_SIZE,
} from "../_lib/shared";

export const dynamic = "force-static";

export async function GET() {
  const [fonts, portrait] = await Promise.all([
    loadOgFonts(),
    readFile(path.join(process.cwd(), "public", DATA.avatarUrl)),
  ]);
  const portraitSrc = `data:image/jpeg;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: OG_COLORS.paper,
        color: OG_COLORS.ink,
        padding: 72,
        gap: 64,
      }}
    >
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <AccentDot />
          <MonoLabel>{DOMAIN}</MonoLabel>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Instrument Serif",
              fontSize: 132,
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
            }}
          >
            {DATA.name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontFamily: "Geist",
              fontSize: 34,
              lineHeight: 1.3,
              color: OG_COLORS.muted,
            }}
          >
            {`${CURRENT_ROLE.title} at ${CURRENT_ROLE.company}`}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            paddingTop: 28,
            borderTop: `1px solid ${OG_COLORS.rule}`,
          }}
        >
          <MonoLabel>{DATA.location}</MonoLabel>
          <MonoLabel color={OG_COLORS.rule}>/</MonoLabel>
          <MonoLabel>Production ML & GenAI</MonoLabel>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          width: 363,
          height: 486,
          borderRadius: 28,
          overflow: "hidden",
          border: `1px solid ${OG_COLORS.rule}`,
        }}
      >
        {/* biome-ignore lint/performance/noImgElement: ImageResponse renders plain img */}
        <img
          src={portraitSrc}
          alt=""
          width={363}
          height={486}
          style={{ width: 363, height: 486, objectFit: "cover" }}
        />
      </div>
    </div>,
    { ...OG_SIZE, fonts },
  );
}
