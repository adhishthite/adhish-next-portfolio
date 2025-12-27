import { TextAnimate } from "@/components/ui/text-animate";
import { WordRotate } from "@/components/ui/word-rotate";
import { NumberTicker } from "@/components/ui/number-ticker";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { Marquee } from "@/components/ui/marquee";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { GridPattern } from "@/components/ui/grid-pattern";
import { WorkExperienceSection } from "@/components/work-experience-section";
import { getBlogPosts } from "@/data/blog";

export default async function Page() {
  // Fetch latest blog post
  const posts = await getBlogPosts();
  const latestPost = posts.sort(
    (a, b) =>
      new Date(b.metadata.publishedAt).getTime() -
      new Date(a.metadata.publishedAt).getTime(),
  )[0];
  // Curated skills by category for Marquee (12-15 items each)
  const aiMlSkills = [
    "Generative AI",
    "Prompt Engineering",
    "Fine-Tuning",
    "Retrieval-Augmented Generation (RAG)",
    "GenAI Agents",
    "Deep Learning",
    "PyTorch",
    "TensorFlow",
    "Machine Learning",
    "Natural Language Processing",
    "Computer Vision",
    "LLM Fine-Tuning",
    "Hugging Face",
  ];

  const languagesFrameworks = [
    "Python",
    "TypeScript",
    "Java",
    "React",
    "Next.js",
    "Node.js",
    "FastAPI",
    "Django",
    "LangChain",
    "LlamaIndex",
    "Scikit-Learn",
    "Pandas",
    "NumPy",
  ];

  const cloudData = [
    "AWS",
    "GCP",
    "Azure",
    "Docker",
    "Kubernetes",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "ElasticSearch",
    "MLFlow",
    "AWS SageMaker",
    "MLOps",
  ];

  const tools = [
    "Git",
    "GitHub",
    "GitHub Actions",
    "Jenkins",
    "DataDog",
    "OpenCV",
    "Microservice Architecture",
    "RESTful and GraphQL Services",
    "Edge AI",
  ];

  return (
    <main className="flex flex-col min-h-[100dvh] relative">
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

      {/* Hero Section - Editorial Minimalist */}
      <section
        id="hero"
        className="relative min-h-[90vh] flex items-center py-24 md:py-32"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-12 md:gap-16 items-center">
            {/* Left Column - Text */}
            <div className="space-y-8">
              {/* Small Tag */}
              <TextAnimate
                animation="blurInUp"
                by="word"
                className="text-sm uppercase tracking-widest text-muted-foreground font-medium"
              >
                End-to-End AI • 0→1 Products • Engineering Leadership
              </TextAnimate>

              {/* Name */}
              <TextAnimate
                animation="blurInUp"
                by="word"
                className="text-6xl md:text-7xl xl:text-8xl font-heading font-bold tracking-tight"
              >
                {DATA.name}
              </TextAnimate>

              {/* Rotating Roles */}
              <div className="flex items-center gap-3 text-xl md:text-2xl text-muted-foreground">
                <WordRotate
                  words={[
                    "Building AI Systems",
                    "Shipping ML Products",
                    "Leading Engineering Teams",
                  ]}
                  duration={3000}
                  className="font-heading font-medium"
                />
              </div>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
                {DATA.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <Link
                  href={`mailto:${DATA.contact.email}`}
                  className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/resume.pdf"
                  className="inline-flex items-center justify-center px-8 py-3 border border-border rounded-lg text-sm font-medium hover:bg-muted/50 transition-colors"
                >
                  View Resume
                </Link>
              </div>

              {/* Social Links */}
              <div className="flex gap-6 pt-2">
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
                      <social.icon className="h-6 w-6" />
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
      </section>

      {/* Featured Blog Post */}
      {latestPost && (
        <section className="py-12 md:py-16 border-t border-border/40">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="flex items-center justify-between mb-6">
              <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
                Latest from the Blog
              </p>
              <Link
                href="/blog"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                View all posts →
              </Link>
            </div>
            <Link href={`/blog/${latestPost.slug}`} className="group block">
              <MagicCard
                className="p-8 rounded-2xl border border-border/40 hover:border-foreground/20 transition-all"
                gradientColor="#3b82f6"
                gradientColorDark="#ffffff"
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
                  <h3 className="text-2xl md:text-3xl font-heading font-bold group-hover:text-foreground/80 transition-colors">
                    {latestPost.metadata.title}
                  </h3>
                  {latestPost.metadata.summary && (
                    <p className="text-muted-foreground leading-relaxed">
                      {latestPost.metadata.summary}
                    </p>
                  )}
                  <span className="inline-flex items-center text-muted-foreground group-hover:text-foreground text-sm transition-colors">
                    Read article →
                  </span>
                </div>
              </MagicCard>
            </Link>
          </div>
        </section>
      )}

      {/* About Section */}
      <section id="about" className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6 space-y-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
            About
          </p>

          <TextAnimate
            animation="blurInUp"
            by="word"
            className="text-2xl md:text-3xl font-heading font-medium leading-relaxed text-foreground/90"
          >
            {DATA.summary}
          </TextAnimate>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8">
            <div className="space-y-2">
              <div className="flex items-baseline gap-2">
                <NumberTicker
                  value={8}
                  className="text-4xl font-heading font-bold"
                />
                <span className="text-2xl font-heading font-bold">+</span>
              </div>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="text-base font-medium">{DATA.location}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Focus</p>
              <p className="text-base font-medium">AI/ML Engineering</p>
            </div>
          </div>
        </div>
      </section>

      {/* Work Experience Section - Bento Grid */}
      <section id="work" className="py-24 md:py-32 bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-6 space-y-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Work Experience
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
              Career Journey
            </h2>
          </div>

          <WorkExperienceSection work={DATA.work} />
        </div>
      </section>

      {/* Skills Section - Marquee */}
      <section id="skills" className="py-24 md:py-32 overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6 space-y-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Skills & Technologies
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
              Technical Expertise
            </h2>
          </div>

          <div className="space-y-6">
            {/* AI/ML Row - Left to Right */}
            <Marquee className="py-4" pauseOnHover fade magnify>
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

            {/* Languages/Frameworks Row - Right to Left */}
            <Marquee className="py-4" reverse pauseOnHover fade magnify>
              {languagesFrameworks.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="mx-2 px-4 py-2 text-sm border-border/40 rounded-full transition-all duration-200 hover:bg-accent/10 hover:border-accent/50 hover:scale-105 cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </Marquee>

            {/* Cloud/Data Row - Left to Right */}
            <Marquee className="py-4" pauseOnHover fade magnify>
              {cloudData.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="mx-2 px-4 py-2 text-sm border-border/40 rounded-full transition-all duration-200 hover:bg-accent/10 hover:border-accent/50 hover:scale-105 cursor-default"
                >
                  {skill}
                </Badge>
              ))}
            </Marquee>

            {/* Tools Row - Right to Left */}
            <Marquee
              className="py-4 [--duration:150s]"
              reverse
              pauseOnHover
              fade
              magnify
            >
              {tools.map((skill) => (
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
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="py-24 md:py-32 bg-muted/30">
        <div className="mx-auto w-full max-w-6xl px-6 space-y-12">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Certifications
            </p>
            <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight">
              Professional Development
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {DATA.certificates.map((cert) => (
              <MagicCard
                key={cert.name + cert.date}
                className="p-6 rounded-2xl border border-border/40 hover:border-accent/50 transition-all duration-300"
                gradientColor="#3b82f6"
                gradientColorDark="#ffffff"
                gradientOpacity={0.15}
              >
                <div className="space-y-4">
                  {cert.iconUrl && (
                    <Avatar className="size-10">
                      <AvatarImage alt={cert.issuer} src={cert.iconUrl} />
                      <AvatarFallback>{cert.issuer[0]}</AvatarFallback>
                    </Avatar>
                  )}
                  <div className="space-y-2">
                    <h3 className="font-heading font-semibold text-base leading-tight">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {cert.issuer}
                    </p>
                    <p className="text-xs text-muted-foreground">{cert.date}</p>
                  </div>
                  {cert.url && (
                    <Link
                      href={cert.url}
                      className="inline-flex items-center text-xs text-accent hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Certificate →
                    </Link>
                  )}
                </div>
              </MagicCard>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-4xl px-6 text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-heading font-bold tracking-tight">
            Let's Connect
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Want to chat? Just shoot me a{" "}
            <Link
              href={DATA.contact.social.X.url}
              className="text-accent hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              direct message on X
            </Link>{" "}
            and I'll respond whenever I can.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <Link
              href={`mailto:${DATA.contact.email}`}
              className="inline-flex items-center justify-center px-8 py-3 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors"
            >
              Email Me
            </Link>
            {Object.values(DATA.contact.social)
              .filter((social) => social.navbar)
              .slice(0, 3)
              .map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  className="inline-flex items-center justify-center px-8 py-3 border border-border rounded-lg text-sm font-medium hover:bg-muted/50 transition-colors gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <social.icon className="h-4 w-4" />
                  {social.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
