import { HackathonCard } from "@/components/hackathon-card";
import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import Markdown from "react-markdown";
import { Card } from "@/components/ui/card";
import { GridPattern } from "@/components/ui/grid-pattern";

const BLUR_FADE_DELAY = 0.04;

export default function Page() {
  return (
    <main className="flex flex-col min-h-[100dvh] relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-black">
        <GridPattern
          width={40}
          height={40}
          strokeDasharray={"4 2"}
          className="fill-neutral-200/10 stroke-neutral-200/40 dark:fill-neutral-800/10 dark:stroke-neutral-800/40"
          x={-1}
          y={-1}
        />
      </div>
      {/* Hero Section */}
      <section id="hero" className="relative py-24 md:py-32">
        <div className="mx-auto w-full max-w-5xl px-6 space-y-8">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
            <div className="flex-1 space-y-4">
              <BlurFadeText
                delay={BLUR_FADE_DELAY}
                className="text-4xl font-bold tracking-tighter sm:text-6xl xl:text-7xl/none bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70"
                yOffset={8}
                text={`Hi, I'm ${DATA.name.split(" ")[0]} 👋`}
              />
              <BlurFadeText
                className="text-lg md:text-xl text-muted-foreground"
                delay={BLUR_FADE_DELAY}
                text={DATA.description}
              />
              <BlurFade delay={BLUR_FADE_DELAY * 2}>
                <div className="flex gap-4 pt-4">
                  {Object.values(DATA.contact.social)
                    .filter((social) => social.navbar)
                    .map((social) => (
                      <Link
                        key={social.name}
                        href={social.url}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <social.icon className="h-6 w-6" />
                      </Link>
                    ))}
                </div>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-40 md:size-48 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-muted/50">
        <div className="mx-auto w-full max-w-5xl px-6 space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 3}>
            <h2 className="text-2xl font-bold">About</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 4}>
            <Card className="p-6">
              <Markdown className="prose max-w-full text-pretty font-sans text-muted-foreground dark:prose-invert">
                {DATA.summary}
              </Markdown>
            </Card>
          </BlurFade>
        </div>
      </section>

      {/* Work Experience Section */}
      <section id="work" className="py-16">
        <div className="mx-auto w-full max-w-5xl px-6 space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-2xl font-bold">Work Experience</h2>
          </BlurFade>
          <div className="grid gap-4">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <ResumeCard
                  key={work.company}
                  logoUrl={work.logoUrl}
                  altText={work.company}
                  title={work.company}
                  subtitle={work.title}
                  href={work.href}
                  badges={work.badges}
                  period={`${work.start} - ${work.end ?? "Present"}`}
                  description={work.description}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-16 bg-muted/50">
        <div className="mx-auto w-full max-w-5xl px-6 space-y-6">
          <BlurFade delay={BLUR_FADE_DELAY * 9}>
            <h2 className="text-2xl font-bold">Skills</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 10}>
            <Card className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                {DATA.skills.map((skill, index) => (
                  <div key={skill} className="flex items-center gap-2">
                    <BlurFade delay={BLUR_FADE_DELAY * 10 + index * 0.02}>
                      <Badge variant="secondary" className="text-sm">
                        {skill}
                      </Badge>
                    </BlurFade>
                  </div>
                ))}
              </div>
            </Card>
          </BlurFade>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-16">
        <div className="mx-auto w-full max-w-5xl px-6 space-y-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  My Projects
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Check out my latest work
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;ve worked on a variety of projects, from simple
                  websites to complex web applications.
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section id="hackathons" className="py-16 bg-muted/50">
        <div className="mx-auto w-full max-w-5xl px-6 space-y-12">
          <BlurFade delay={BLUR_FADE_DELAY * 13}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Certifications
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  I like exploring
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Throughout my career, I have completed a number of
                  certifications.
                </p>
              </div>
            </div>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 14}>
            <Card className="p-6">
              <ul className="divide-y divide-border">
                {DATA.hackathons.map((project, id) => (
                  <BlurFade
                    key={project.title + project.dates}
                    delay={BLUR_FADE_DELAY * 15 + id * 0.05}
                  >
                    <HackathonCard
                      title={project.title}
                      description={project.description}
                      location={project.location}
                      dates={project.dates}
                      image={project.image}
                      links={project.links}
                    />
                  </BlurFade>
                ))}
              </ul>
            </Card>
          </BlurFade>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16">
        <div className="mx-auto w-full max-w-5xl px-6 space-y-12">
          <BlurFade delay={BLUR_FADE_DELAY * 16}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Contact
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Get in Touch
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Want to chat? Just shoot me a dm{" "}
                  <Link
                    href={DATA.contact.social.X.url}
                    className="text-blue-500 hover:underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    with a direct question on X
                  </Link>{" "}
                  and I&apos;ll respond whenever I can.
                </p>
              </div>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
