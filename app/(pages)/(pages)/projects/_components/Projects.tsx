"use client";
import Card from "@components/UI/Card";
import { ListGitHubRepo, ResponseError } from "@utils/types";
import { use } from "react";
import ErrorContainer from "./ErrorContainer";
import CTALinkButton from "@/app/components/UI/CTALinkButton";
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
      className="flex max-w-110 flex-col items-center justify-center gap-2 py-6 tablet:flex-row tablet:items-stretch desktop:gap-4"
    >
      {projectList.projects.map((item) => (
        <li
          role="presentation"
          key={item.id}
          className="flex tablet:max-w-[50%]"
        >
          <Card className="grid grid-rows-[min-content_auto_1fr_auto]">
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
                  <CTALinkButton link={item.homepage as string} target="_blank">
                    Visit Website
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
