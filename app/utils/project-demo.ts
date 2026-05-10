import { octokit, githubUserName } from "./github-auth";
import { ListGitHubRepo } from "@utils/types";
export const fetchProjectDemo = async () => {
  const filterNames = ["gulbindev-portfolio", "Crunchtime"];
  let fetchError = false;
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
  } catch (error) {
    fetchError = true;
    console.error("Failed to load GitHub Repos:", error);
  }

  const reponse = { projects, fetchError };
  return reponse;
};
