import { fetchProjectDemo } from "@utils/project-demo";
import PreviewVideo from "./PreviewVideo";
import Link from "next/link";

export default async function Projects() {
  const { projects } = await fetchProjectDemo();
  console.log(projects);
  return (
    <div className="flex flex-col gap-4 max-w-180 tablet-portrait:w-[90vw] justify-self-center py-5">
      {projects.map((project) => (
        <div
          key={project.id}
          className="grid grid-cols-[auto_1fr] gap-5 rounded-xl border p-4"
        >
          <PreviewVideo folder={project.name} />
          <article className="grid grid-rows-[auto_1fr_auto]">
            <h3 className="text-size-lg font-semibold">{project.name}</h3>
            <p className="mt-2 text-pretty">
              {project.description ?? "No description available."}
            </p>
            <ul className="flex gap-3 mt-2 text-size-md">
              <li>
                <Link href={project.homepage as string} target="_blank">
                  Visit Website
                </Link>
              </li>
              <li>
                <Link href={project.html_url} target="_blank">
                  View on GitHub
                </Link>
              </li>
            </ul>
          </article>
        </div>
      ))}
    </div>
  );
}
