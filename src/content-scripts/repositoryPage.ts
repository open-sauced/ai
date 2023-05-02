import {
  getGithubRepoName,
  getGithubRepoOwnerName,
} from "../utils/urlMatchers";
import {
  injectVoteRepoButton,
  injectUnvoteRepoButton,
} from "../utils/dom-utils/voteRepo";
import { OPEN_SAUCED_AUTH_TOKEN_KEY } from "../constants";
import {
  checkTokenValidity,
  checkUserVotedRepo,
  repoExistsOnOpenSauced,
} from "../utils/fetchOpenSaucedApiData";

const checkUserLoggedIn = async () => {
  const data = await chrome.storage.sync.get([OPEN_SAUCED_AUTH_TOKEN_KEY]);
  if (!data[OPEN_SAUCED_AUTH_TOKEN_KEY]) return false;
  try {
    const isValid = await checkTokenValidity(data[OPEN_SAUCED_AUTH_TOKEN_KEY]);
    return isValid;
  } catch (error) {
    console.error("Error fetching auth status", error);
    return false;
  }
};

const processRepoPage = async () => {
  const repoName = getGithubRepoName(window.location.href);
  const repoOwnerName = getGithubRepoOwnerName(window.location.href) || "";
  if (
    repoName &&
    (await checkUserLoggedIn()) &&
    !(await repoExistsOnOpenSauced(repoOwnerName, repoName))
  ) {
    if (await checkUserVotedRepo(repoOwnerName, repoName)) {
      injectVoteRepoButton(repoName);
    }
    injectUnvoteRepoButton(repoName);
  }
};

await processRepoPage();
