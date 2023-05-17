import { GITHUB_PR_BASE_BRANCH_SELECTOR } from "../constants";

export const getGithubUsername = (url: string) => {
  const match = url.match(/github\.com\/([\w.-]+)/);

  return match ? match[1] : undefined;
};

export const getLinkedInUsername = (url: string) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/(?:#!\/)?@?([^/?\s]*)/,
  );

  return match ? match[1] : undefined;
};

export const getTwitterUsername = (url: string) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([^/?\s]*)/,
  );

  return match ? match[1] : undefined;
};

export const isGithubPullRequestPage = (url: string) => {
  const githubPullRequestPattern = /github\.com\/[\w.-]+\/[^/]+\/pull\/\d+/;

  return githubPullRequestPattern.test(url);
};

export const isGithubProfilePage = (url: string) => {
  const githubProfilePattern = /github\.com\/[^/]+$/;

  return githubProfilePattern.test(url);
};


export const isGithubRepoPage = (url: string) => {
  const githubRepoPattern = /github\.com\/[^/]+\/[^/]+$/;

  return githubRepoPattern.test(url);
};

export const isPullRequestCreatePage = (url: string) => {
  const githubPullRequestPattern = /github\.com\/[\w.-]+\/[^/]+\/compare\/\w+/;

  return githubPullRequestPattern.test(url);
};

export const getPullRequestAPIURL = (url: string) => {
  const baseBranch = document.getElementsByClassName(GITHUB_PR_BASE_BRANCH_SELECTOR)[1].textContent;
  url = url.replace(/github\.com/, "api.github.com/repos");
  if(url.match(/compare\/.*\.\.\./)) return url;
  url = url.replace(/compare\//, `compare/${baseBranch}...`);
  return url;
};
