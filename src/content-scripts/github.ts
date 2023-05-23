import {
    getGithubUsername,
    isGithubProfilePage,
    isGithubPullRequestPage,
    isPullRequestCreatePage,
    isPullRequestFilesChangedPage,
} from "../utils/urlMatchers";
import { isOpenSaucedUser } from "../utils/fetchOpenSaucedApiData";
import injectViewOnOpenSauced from "../utils/dom-utils/viewOnOpenSauced";
import injectInviteToOpenSauced from "../utils/dom-utils/inviteToOpenSauced";
import { prefersDarkMode } from "../utils/colorPreference";
import injectAddPRToHighlightsButton from "../utils/dom-utils/addPRToHighlights";

// import injectRepoVotingButtons from "../utils/dom-utils/repoVotingButtons";
import domUpdateWatch from "../utils/dom-utils/domUpdateWatcher";
import injectDescriptionGeneratorButton from "../utils/dom-utils/addDescriptionGenerator";
import injectChangeSuggestorButton from "../utils/dom-utils/changeSuggestorButton";
import prEditWatch, { prReviewWatch } from "../utils/dom-utils/prWatcher";

const processGithubPage = async () => {
    if (prefersDarkMode(document.cookie)) {
        document.documentElement.classList.add("dark");
    }
    if (isPullRequestCreatePage(window.location.href)) {
        void injectDescriptionGeneratorButton();
    } else if (isPullRequestFilesChangedPage(window.location.href)) {
        prReviewWatch(injectChangeSuggestorButton, 500);
    } else if (isGithubPullRequestPage(window.location.href)) {
        prEditWatch(injectDescriptionGeneratorButton);
        void injectAddPRToHighlightsButton();
    } else if (isGithubProfilePage(window.location.href)) {
        const username = getGithubUsername(window.location.href);

        if (!username) {
            return;
        }
        if (await isOpenSaucedUser(username)) {
            injectViewOnOpenSauced(username);
        } else {
            injectInviteToOpenSauced(username);
        }
    }

    /*
     * commenting out repo voting because it's not ready yet // issue #106
     * } else if (isGithubRepoPage(window.location.href)) {
     * const ownerName = getGithubUsername(window.location.href) ?? "";
     * const repoName = window.location.href.split("/").pop() ?? "";
     *
     * await injectRepoVotingButtons(ownerName, repoName);
     * }
     */

    domUpdateWatch(processGithubPage, 50);
};

void processGithubPage();

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
if (msg.text === "getAiHighlights") {
    sendResponse("test");
  }
});
