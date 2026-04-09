import { TextAnimate } from "@/components/ui/text-animate";
import { WordRotate } from "@/components/ui/word-rotate";
import { NumberTicker } from "@/components/ui/number-ticker";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Marquee } from "@/components/ui/marquee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA, YEARS_OF_EXPERIENCE } from "@/data/resume";
import Link from "next/link";
import { GridPattern } from "@/components/ui/grid-pattern";
import { WorkExperienceSection } from "@/components/work-experience-section";
import { ResumeViewerTrigger } from "@/components/resume-viewer-trigger";
import { getBlogPosts } from "@/data/blog";
import { CertificationsSection } from "@/components/certifications-section";
import { FadeIn } from "@/components/ui/fade-in";
import { ChevronDown } from "lucide-react";

export default async function Page() {
  const posts = await getBlogPosts();
  const latestPost = posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  )[0];

  const blogPostCount = posts.length;

  // Two marquee rows: AI/ML core + Engineering stack
  const aiMlSkills = [
    "Generative AI",
    "Prompt Engineering",
    "Fine-Tuning",
    "RAG",
    "GenAI Agents",
    "Deep Learning",
    "PyTorch",
    "TensorFlow",
    "Machine Learning",
    "NLP",
    "Computer Vision",
    "LLM Fine-Tuning",
    "Hugging Face",
  ];

  const engineeringStack = [
    "Python",
    "TypeScript",
    "Java",
    "React",
    "Next.js",
    "Node.js",
    "FastAPI",
    "Django",
    "AWS",
    "GCP",
    "Azure",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "Redis",
    "MLOps",
    "GitHub Actions",
    "DataDog",
  ];

  return (
    <main className="isolate flex flex-col min-h-dvh relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <GridPattern
          width={40}
          height={40}
          strokeDasharray={"4 2"}
          className="fill-neutral-200/5 stroke-neutral-200/20 dark:fill-neutral-800/5 dark:stroke-neutral-800/20"
          x={-1}
          y={-1}
        />
      </div>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center py-24 md:py-32"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-12 md:gap-16 items-center">
            {/* Left Column - Text */}
            <div className="space-y-8 text-center md:text-left">
              {/* Currently at */}
              <div className="flex items-center justify-center md:justify-start gap-3">
                <Avatar className="size-6 border">
                  <AvatarImage alt="Elastic" src="/elastic.svg" />
                  <AvatarFallback>E</AvatarFallback>
                </Avatar>
                <span className="text-sm text-muted-foreground">
                  Lead AI Engineer at{" "}
                  <Link
                    href="https://elastic.co"
                    className="text-foreground hover:text-accent transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Elastic
                  </Link>
                </span>
              </div>

              {/* Name */}
              <TextAnimate
                animation="blurInUp"
                by="word"
                className="text-6xl md:text-7xl xl:text-8xl font-heading font-semibold tracking-tight text-balance"
              >
                {DATA.name}
              </TextAnimate>

              {/* Rotating Roles */}
              <div className="flex items-center justify-center md:justify-start text-xl md:text-2xl text-muted-foreground">
                <WordRotate
                  words={[
                    "Building AI Systems",
                    "Shipping ML Products",
                    "Leading Engineering Teams",
                    "End-to-End AI",
                    "0 to 1 Products",
                  ]}
                  duration={3000}
                  className="font-heading font-medium"
                />
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
                <Link
                  href={`mailto:${DATA.contact.email}`}
                  className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  Get in Touch
                </Link>
                <ResumeViewerTrigger />
              </div>

              {/* Social Links */}
              <div className="flex justify-center md:justify-start gap-6 pt-2">
                {Object.values(DATA.contact.social)
                  .filter((social) => social.navbar)
                  .map((social) => (
                    <Link
                      key={social.name}
                      href={social.url}
                      className="text-muted-foreground hover:text-foreground transition-all hover:scale-110"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="size-6" />
                    </Link>
                  ))}
              </div>
            </div>

            {/* Right Column - Avatar */}
            <div className="flex justify-center md:justify-end">
              <div className="relative">
                <Avatar className="size-64 md:size-72 border-2">
                  <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                  <AvatarFallback>{DATA.initials}</AvatarFallback>
                </Avatar>
                <BorderBeam size={250} duration={12} delay={9} />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="size-6 text-muted-foreground/50" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 md:py-32 border-t border-border/40">
        <div className="mx-auto w-full max-w-6xl px-6 space-y-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium font-mono">
            About
          </p>

          <TextAnimate
            animation="blurInUp"
            by="word"
            className="text-2xl md:text-3xl font-heading font-medium leading-relaxed text-foreground/90 max-w-4xl text-pretty"
          >
            {DATA.summary}
          </TextAnimate>

          {/* Stats Grid */}
          <FadeIn delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <NumberTicker
                    value={YEARS_OF_EXPERIENCE}
                    className="text-4xl font-heading font-semibold tabular-nums"
                  />
                  <span className="text-2xl font-heading font-semibold">+</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Years Experience
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <NumberTicker
                    value={DATA.work.length}
                    className="text-4xl font-heading font-semibold tabular-nums"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Companies</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <NumberTicker
                    value={blogPostCount}
                    className="text-4xl font-heading font-semibold tabular-nums"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Blog Posts</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-baseline gap-1">
                  <NumberTicker
                    value={DATA.certificates.length}
                    className="text-4xl font-heading font-semibold tabular-nums"
                  />
                </div>
                <p className="text-sm text-muted-foreground">Certifications</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Blog Post */}
      {latestPost && (
        <section className="py-12 md:py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium font-mono">
                Latest from the Blog
              </p>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View all posts →
              </Link>
            </div>
            <FadeIn>
              <Link href={`/blog/${latestPost.slug}`} className="group block">
                <MagicCard
                  className="p-8 rounded-2xl border border-border/40 hover:border-foreground/20 transition-all"
                  gradientColor="#5B122D"
                  gradientColorDark="#d4a5a5"
                  gradientOpacity={0.15}
                >
                  <div className="space-y-4">
                    <time className="text-xs uppercase tracking-widest text-muted-foreground">
                      {new Date(
                        latestPost.metadata.publishedAt,
                      ).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                    <h3 className="text-2xl md:text-3xl font-heading font-semibold text-balance group-hover:text-foreground/80 transition-colors">
                      {latestPost.metadata.title}
                    </h3>
                    {latestPost.metadata.summary && (
                      <p className="text-muted-foreground leading-relaxed text-pretty">
                        {latestPost.metadata.summary}
                      </p>
                    )}
                    <span className="inline-flex items-center text-muted-foreground group-hover:text-foreground text-sm transition-colors">
                      Read article →
                    </span>
                  </div>
                </MagicCard>
              </Link>
            </FadeIn>
          </div>
        </section>
      )}

      {/* Work Experience Section */}
      <div className="h-16 md:h-24 bg-gradient-to-b from-transparent to-[hsl(32,50%,80%)] dark:to-[hsl(20,15%,13%)]" />
      <section
        id="work"
        className="py-12 md:py-20 bg-[hsl(32,50%,80%)] dark:bg-[hsl(20,15%,13%)]"
      >
        <div className="mx-auto w-full max-w-6xl px-6 space-y-12">
          <FadeIn>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium font-mono">
                Work Experience
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-balance">
                Career Journey
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <WorkExperienceSection work={DATA.work} />
          </FadeIn>
        </div>
      </section>
      <div className="h-16 md:h-24 bg-gradient-to-b from-[hsl(32,50%,80%)] to-transparent dark:from-[hsl(20,15%,13%)]" />

      {/* Education Section */}
      <section id="education" className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6 space-y-12">
          <FadeIn>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium font-mono">
                Education
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-balance">
                Academic Background
              </h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {DATA.education.map((edu) => (
                <Link
                  key={edu.school}
                  href={edu.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <MagicCard
                    className="p-6 rounded-2xl border border-border/40 hover:border-accent/50 transition-all duration-300 h-full"
                    gradientColor="#5B122D"
                    gradientColorDark="#d4a5a5"
                    gradientOpacity={0.15}
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="size-14 border shrink-0">
                        <AvatarImage alt={edu.school} src={edu.logoUrl} />
                        <AvatarFallback>{edu.school[0]}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1.5">
                        <h3 className="font-heading font-semibold text-lg group-hover:text-accent transition-colors">
                          {edu.school}
                        </h3>
                        <p className="text-sm text-foreground/80">
                          {edu.degree}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {edu.start} - {edu.end}
                        </p>
                      </div>
                    </div>
                  </MagicCard>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Skills Section - Two Marquee Rows */}
      <section id="skills" className="py-16 md:py-24 overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6 space-y-10">
          <FadeIn>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium font-mono">
                Skills & Technologies
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-balance">
                Technical Expertise
              </h2>
            </div>
          </FadeIn>

          <div className="space-y-6">
            {/* AI/ML Row */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium font-mono px-1">
                AI / ML
              </p>
              <Marquee className="py-2" pauseOnHover fade>
                {aiMlSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="mx-2 px-4 py-2 text-sm border-border/40 rounded-full transition-all duration-200 hover:bg-accent/10 hover:border-accent/50 hover:scale-105 cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </Marquee>
            </div>

            {/* Engineering Stack Row */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium font-mono px-1">
                Engineering Stack
              </p>
              <Marquee className="py-2" reverse pauseOnHover fade>
                {engineeringStack.map((skill) => (
                  <Badge
                    key={skill}
                    variant="outline"
                    className="mx-2 px-4 py-2 text-sm border-border/40 rounded-full transition-all duration-200 hover:bg-accent/10 hover:border-accent/50 hover:scale-105 cursor-default"
                  >
                    {skill}
                  </Badge>
                ))}
              </Marquee>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <div className="h-16 md:h-24 bg-gradient-to-b from-transparent to-[hsl(32,50%,80%)] dark:to-[hsl(20,15%,13%)]" />
      <section
        id="certifications"
        className="py-12 md:py-20 bg-[hsl(32,50%,80%)] dark:bg-[hsl(20,15%,13%)]"
      >
        <div className="mx-auto w-full max-w-6xl px-6 space-y-12">
          <FadeIn>
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium font-mono">
                Certifications
              </p>
              <h2 className="text-4xl md:text-5xl font-heading font-semibold tracking-tight text-balance">
                Professional Development
              </h2>
            </div>
          </FadeIn>

          <CertificationsSection certificates={DATA.certificates} />
        </div>
      </section>
      <div className="h-16 md:h-24 bg-gradient-to-b from-[hsl(32,50%,80%)] to-transparent dark:from-[hsl(20,15%,13%)]" />

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-6xl px-6 text-center space-y-8">
          <FadeIn>
            <h2 className="text-5xl md:text-6xl font-heading font-semibold tracking-tight text-balance">
              Let&apos;s Work Together
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-pretty">
              Currently interested in AI consulting, technical leadership roles,
              and speaking at conferences. Drop me a line.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 max-w-2xl mx-auto">
            <Link
              href={`mailto:${DATA.contact.email}`}
              className="inline-flex items-center justify-center px-6 py-4 bg-foreground text-background rounded-xl text-sm font-medium hover:bg-foreground/90 transition-colors flex-col gap-1"
            >
              <span className="text-xs text-background/60">Consulting</span>
              <span>Email Me</span>
            </Link>
            <Link
              href={DATA.contact.social.LinkedIn.url}
              className="inline-flex items-center justify-center px-6 py-4 border border-border rounded-xl text-sm font-medium hover:bg-muted/50 transition-colors flex-col gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-xs text-muted-foreground">
                Collaboration
              </span>
              <span className="flex items-center gap-2">
                <DATA.contact.social.LinkedIn.icon className="size-4" />
                LinkedIn
              </span>
            </Link>
            <Link
              href={DATA.contact.social.X.url}
              className="inline-flex items-center justify-center px-6 py-4 border border-border rounded-xl text-sm font-medium hover:bg-muted/50 transition-colors flex-col gap-1"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="text-xs text-muted-foreground">Say Hi</span>
              <span className="flex items-center gap-2">
                <DATA.contact.social.X.icon className="size-4" />
                DM on X
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
