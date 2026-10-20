import { Contact } from "@/components/home/contact";
import { Education } from "@/components/home/education";
import { Experience } from "@/components/home/experience";
import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { Skills } from "@/components/home/skills";
import { Writing } from "@/components/home/writing";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Education />
      <Writing />
      <Contact />
    </main>
  );
}
