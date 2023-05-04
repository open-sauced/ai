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
