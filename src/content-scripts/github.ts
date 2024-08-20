import {
    getGithubUsername,
    isGithubProfilePage,
} from "../utils/urlMatchers";
import { isOpenSaucedUser } from "../utils/fetchOpenSaucedApiData";
import injectViewOnOpenSauced from "../utils/dom-utils/viewOnOpenSauced";
import injectInviteToOpenSauced from "../utils/dom-utils/inviteToOpenSauced";
import { prefersDarkMode } from "../utils/colorPreference";

import domUpdateWatch from "../utils/dom-utils/domUpdateWatcher";

const processGithubPage = async () => {
    if (prefersDarkMode(document.cookie)) {
        document.documentElement.classList.add("dark");
    }
    if (isGithubProfilePage(window.location.href)) {
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

    domUpdateWatch(processGithubPage, 50);
};

void processGithubPage();
