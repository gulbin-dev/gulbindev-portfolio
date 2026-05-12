import { fetchProjectDemo } from "@utils/project-demo";
import PreviewVideo from "./PreviewVideo";
import Link from "next/link";

export default async function Projects() {
  const { projects } = await fetchProjectDemo();
  return (
    <div className="flex flex-col gap-4 max-w-180 tablet-portrait:w-[90vw] justify-self-center mt-5">
      {projects.map((project) => (
        <div
          key={project.id}
          className="grid grid-rows-[auto_1fr] gap-5 mb-15 border-b-10 pb-5 tablet-portrait:rounded-xl tablet-portrait:border  tablet-portrait:mb-0 desktop:grid-cols-[auto_1fr] desktop:pl-4 desktop:pt-4 desktop:pb-0"
        >
          <PreviewVideo folder={project.name} />
          <article className="grid grid-rows-[auto_1fr_auto] px-3">
            <h3 className="text-size-lg font-semibold">{project.name}</h3>
            <p className="mt-2 text-pretty">
              {project.description ?? "No description available."}
            </p>
            <ul className="flex flex-col gap-3 mt-5 items-center text-size-md tablet-portrait:flex-row desktop:mt-0">
              <li>
                <Link href={project.homepage as string} target="_blank">
                  <span className="px-3 py-1 bg-action-color rounded-2xl text-dark-foreground font-bold">
                    Visit Website
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href={project.html_url}
                  target="_blank"
                  className="relative"
                >
                  <span className="py-0.75 relative text-light-foreground">
                    <span className="view-github"> View on GitHub</span>
                  </span>
                </Link>
              </li>
            </ul>
          </article>
        </div>
      ))}
    </div>
  );
}
