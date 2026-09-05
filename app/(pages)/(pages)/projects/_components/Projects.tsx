"use client";
import Card from "@components/UI/Card";
import { ListGitHubRepo, ResponseError } from "@utils/types";
import { use } from "react";
import ErrorContainer from "@components/UI/Error/ErrorContainer";
import CTALinkButton from "@components/UI/CTALinkButton";
import PreviewVideo from "./PreviewVideo";

export default function Projects({
  projects,
}: {
  projects: Promise<{
    projects: ListGitHubRepo[];
    responseError: ResponseError;
  }>;
}) {
  const projectList = use(projects);
  if (projectList.responseError.status)
    return <ErrorContainer error={projectList.responseError} />;
  return (
    <ul
      aria-label="Project"
      className="grid grid-cols-1 gap-4 py-6 tablet:grid-cols-2 desktop:gap-6"
    >
      {projectList.projects.map((item) => (
        <li role="presentation" key={item.id} className="flex w-full">
          <Card className="grid w-full grid-rows-[min-content_auto_1fr_auto]">
            <PreviewVideo folder={item.name} />

            <h2 className="relative z-3 row-start-2 py-2 text-size-md">
              {item.name}
            </h2>
            <p className="relative z-3 row-start-3">{item.description}</p>
            <nav
              aria-label={`${item.name}'s`}
              className="relative z-3 row-start-4 py-5"
            >
              <ul aria-label="navigation" className="flex gap-1">
                <li>
                  <CTALinkButton
                    link={item.homepage as string}
                    target="_blank"
                    className={`${item.name === "gulbindev-portfolio" ? "bg-this-website" : ""}`}
                  >
                    {item.name === "gulbindev-portfolio"
                      ? "This Website"
                      : "Visit Website"}
                  </CTALinkButton>
                </li>
                <li>
                  <CTALinkButton link={item.html_url} target="_blank">
                    Github
                  </CTALinkButton>
                </li>
              </ul>
            </nav>
          </Card>
        </li>
      ))}
    </ul>
  );
}
