import { Contact } from "@/components/home/contact";
import { Education } from "@/components/home/education";
import { Experience } from "@/components/home/experience";
import { Expertise } from "@/components/home/expertise";
import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { Writing } from "@/components/home/writing";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Experience />
      <Expertise />
      <Projects />
      <Education />
      <Writing />
      <Contact />
    </main>
  );
}
