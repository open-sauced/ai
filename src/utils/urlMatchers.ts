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
    const githubPullRequestPattern = /github\.com\/[\w.-]+\/[^/]+\/pull\/\d+(\/)?$/;

    return githubPullRequestPattern.test(url);
};

export const isGithubProfilePage = (url: string) => {
    const githubProfilePattern = /github\.com\/[^/]+$/;

    return githubProfilePattern.test(url);
};

export const isGithubRepoPage = (url: string) => {
    const githubRepoPattern = /github\.com\/[^/]+\/[^/]+\/?$/;

    return githubRepoPattern.test(url);
};

export const isPullRequestCreatePage = (url: string) => {
    const githubPullRequestPattern = /^https:\/\/(www\.)?github\.com\/[\w.-]+\/[^/]+\/compare\/\w+/;

    return githubPullRequestPattern.test(url);
};

export const isPullRequestFilesChangedPage = (url: string) => {
    const githubPullRequestFilesChangedPattern = /^https:\/\/(www\.)?github\.com\/[\w.-]+\/[^/]+\/pull\/\d+\/files/;

    return githubPullRequestFilesChangedPattern.test(url);
};

export const isOnGitHub = (url: string) => new URL(url).hostname === "github.com";

export const getRepoAPIURL = (url: string) => url.replace(/github\.com/, "api.github.com/repos");

export const getPullRequestAPIURL = async (url: string) => {
    const apiURL = url.replace(/github\.com/, "api.github.com/repos");

    if (isGithubPullRequestPage(url)) {
        return apiURL.replace("pull", "pulls");
    }

    // New pull request create page
    if (url.match(/compare\/.*\.\.\./)) {
        return apiURL;
    }

    // The HEAD branch name is not present in the URL, get the default branch
    const { username, repoName } = url.match(
        /^https?:\/\/(www\.)?github.com\/(?<username>[\w.-]+)\/?(?<repoName>[\w.-]+)?/,
    )?.groups ?? {};
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const { default_branch } = await response.json();

    return apiURL.replace(/compare\//, `compare/${default_branch}...`);
};
