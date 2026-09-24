import { projects } from "../data/projects.js";
import { experiences } from "../data/experiences.js";

export function projectStaticPaths() {
  return projects
    .filter((project) => project.hasDetailPage)
    .map((project) => ({ params: { slug: project.key } }));
}

export function experienceStaticPaths() {
  return experiences.map((experience) => ({ params: { slug: experience.slug } }));
}
