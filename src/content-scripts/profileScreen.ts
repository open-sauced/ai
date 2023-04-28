import { getGithubUsername } from "../utils/urlMatchers";
import { isOpenSaucedUser } from "../utils/fetchOpenSaucedApiData";
import injectViewOnOpenSauced from "../utils/dom-utils/viewOnOpenSauced";
import injectInviteToOpenSauced from "../utils/dom-utils/inviteToOpenSauced";
import { getGHColorScheme } from "../utils/colorPreference";

const processProfilePage = async () => {
  const username = getGithubUsername(window.location.href);
  if (username != null) {
    const colorScheme = getGHColorScheme(document.cookie);
    const user = await isOpenSaucedUser(username);
    if (user) injectViewOnOpenSauced(username, colorScheme);
    else injectInviteToOpenSauced(username, colorScheme);
  }
};

chrome.runtime.onMessage.addListener((request) => {
  if (request.message === "GITHUB_URL_CHANGED") {
    processProfilePage();
  }
});

processProfilePage();
