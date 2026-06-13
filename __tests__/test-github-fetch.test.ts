import { expect, test, vi, beforeEach } from "vitest";
import { fetchProjectDemo } from "@server/project-demo";
import { octokit } from "@utils/github-auth";

// 1. Mock the GitHub auth utilities
vi.mock("@utils/github-auth", () => ({
  githubUserName: "gulbin-dev",
  octokit: {
    request: vi.fn(),
  },
}));

// 2. Clear all mocks before each test to prevent side effects
beforeEach(() => {
  vi.clearAllMocks();
});

type OctokitResponse = Awaited<ReturnType<typeof octokit.request>>;

// 3. Test Suite
test("should fetch and filter only allowed repositories on success", async () => {
  // Mock data representing what GitHub API returns
  const mockGitHubData = [
    { name: "gulbindev-portfolio", description: "Portfolio site" },
    { name: "Crunchtime", description: "Movie website" },
  ];

  // Fix: Added required octokit response properties
  vi.mocked(octokit.request).mockResolvedValue({
    data: mockGitHubData,
    status: 200,
    headers: {},
    url: "",
  } as OctokitResponse);

  const result = await fetchProjectDemo();

  // Fix: Changed 'testuser' to 'gulbin-dev' to match the mock above
  expect(octokit.request).toHaveBeenCalledWith(
    "GET /users/gulbin-dev/repos",
    expect.objectContaining({
      username: "gulbin-dev",
      headers: { "X-GitHub-Api-Version": "2022-11-28" },
    }),
  );

  // Assert filtering works (should only contain 2 projects)
  expect(result.projects).toHaveLength(2);
  expect(result.projects[0].name).toBe("gulbindev-portfolio");
  expect(result.projects[1].name).toBe("Crunchtime");

  // Assert error state is false
  expect(result.responseError.status).toBe(false);
});

test("should return empty projects array if API returns non-array data", async () => {
  // Fix: Added required octokit response properties
  vi.mocked(octokit.request).mockResolvedValue({
    data: { message: "Not Found" },
    status: 404,
    headers: {},
    url: "",
  } as OctokitResponse);

  const result = await fetchProjectDemo();

  expect(result.projects).toEqual([]);
  expect(result.responseError.status).toBe(false);
});

test("should catch errors and populate responseError on API failure", async () => {
  // Spy on console.error to prevent polluting test logs
  const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

  // Simulate an API network failure
  vi.mocked(octokit.request).mockRejectedValue(new Error("API Timeout"));

  const result = await fetchProjectDemo();

  // Assert empty project list
  expect(result.projects).toEqual([]);

  // Assert error details are filled
  expect(result.responseError.status).toBe(true);
  expect(result.responseError.message).toBe("API Timeout");
  expect(result.responseError.name).toBe("Error");

  // Verify error was logged
  expect(consoleSpy).toHaveBeenCalled();

  consoleSpy.mockRestore();
});
