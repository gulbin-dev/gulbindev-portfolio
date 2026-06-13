import { octokit, githubUserName } from "@utils/github-auth";
import { ListGitHubRepo, ResponseError } from "@utils/types";

// fech github repos
export const fetchProjectDemo = async () => {
  const filterNames = ["gulbindev-portfolio", "Crunchtime"]; // only selected repos are fetched
  const responseError: ResponseError = { status: false };

  let projects: ListGitHubRepo[] = [];
  try {
    const { data } = await octokit.request(
      `GET /users/${githubUserName}/repos`,
      {
        username: githubUserName,
        headers: {
          "X-GitHub-Api-Version": "2022-11-28",
        },
      },
    );
    projects = Array.isArray(data)
      ? data.filter((repo: ListGitHubRepo) => filterNames.includes(repo.name))
      : [];
  } catch (err) {
    const error = err as Error;
    responseError.status = true;
    responseError.name = error.name;
    responseError.message = error.message;

    console.error("Failed to load GitHub Repos:", err);
  }

  const reponse = { projects, responseError };
  return reponse;
};
