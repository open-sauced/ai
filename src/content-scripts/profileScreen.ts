import { getGithubUsername } from "../utils/urlMatchers";
import { isOpenSaucedUser } from "../utils/fetchOpenSaucedApiData";
import injectViewOnOpenSauced from "../utils/dom-utils/viewOnOpenSauced";
import injectInviteToOpenSauced from "../utils/dom-utils/inviteToOpenSauced";
import { prefersDarkMode } from "../utils/colorPreference";

const processProfilePage = async () => {
  const username = getGithubUsername(window.location.href);

  if (username) {
    const darkMode = prefersDarkMode(document.cookie);

    if (darkMode) {
 document.documentElement.classList.add("dark");
}
    const user = await isOpenSaucedUser(username);

    if (user) {
 injectViewOnOpenSauced(username);
} else {
 injectInviteToOpenSauced(username);
}
  }
};

chrome.runtime.onMessage.addListener(request => {
  if (request.message === "GITHUB_URL_CHANGED") {
    void processProfilePage();
  }
});

void processProfilePage();
