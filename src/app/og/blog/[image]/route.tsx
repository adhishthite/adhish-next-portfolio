import { ImageResponse } from "next/og";
import { getBlogPosts, getPost } from "@/data/blog";
import { CURRENT_ROLE, DATA } from "@/data/resume";
import { formatDate } from "@/lib/utils";
import {
  AccentDot,
  DOMAIN,
  loadOgFonts,
  MonoLabel,
  OG_COLORS,
  OG_SIZE,
} from "../../_lib/shared";

export const dynamic = "force-static";
export const dynamicParams = false;

type Params = { image: string };

export async function generateStaticParams(): Promise<Params[]> {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ image: `${post.slug}.png` }));
}

/** Step the title size down as it gets longer so it stays within three lines. */
function titleSize(title: string): number {
  const length = title.length;
  if (length <= 32) return 116;
  if (length <= 56) return 100;
  if (length <= 80) return 86;
  return 72;
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<Params> },
) {
  const { image } = await params;
  const slug = image.replace(/\.png$/, "");
  const post = image.endsWith(".png") ? await getPost(slug) : null;
  if (!post) return new Response("Not found", { status: 404 });

  const fonts = await loadOgFonts();
  const { title, publishedAt } = post.metadata;
  const fontSize = titleSize(title);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: OG_COLORS.paper,
        color: OG_COLORS.ink,
        padding: "72px 80px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <AccentDot />
            <MonoLabel color={OG_COLORS.ink}>Writing</MonoLabel>
          </div>
          <MonoLabel>
            {`${formatDate(publishedAt)} · ${post.readingTime} min read`}
          </MonoLabel>
        </div>

        <div
          style={{
            display: "block",
            marginTop: 56,
            fontFamily: "Instrument Serif",
            fontSize,
            lineHeight: 1.04,
            letterSpacing: "-0.02em",
            lineClamp: 3,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 28,
          borderTop: `1px solid ${OG_COLORS.rule}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 40,
              height: 3,
              backgroundColor: OG_COLORS.accent,
            }}
          />
          <div
            style={{
              display: "flex",
              fontFamily: "Geist",
              fontWeight: 500,
              fontSize: 28,
            }}
          >
            {DATA.name}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Geist",
              fontSize: 28,
              color: OG_COLORS.muted,
            }}
          >
            {`${CURRENT_ROLE.title} at ${CURRENT_ROLE.company}`}
          </div>
        </div>
        <MonoLabel>{DOMAIN}</MonoLabel>
      </div>
    </div>,
    { ...OG_SIZE, fonts },
  );
}
