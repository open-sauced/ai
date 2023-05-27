import {
    GITHUB_PROFILE_USER_PROFILE_BIO_SELECTOR,
    GITHUB_PROFILE_EDIT_MENU_SELECTOR,
} from "../../constants";
import { ViewOnOpenSaucedButton } from "../../content-scripts/components/ViewOnOpenSaucedButton/ViewOnOpenSaucedButton";

const injectViewOnOpenSaucedButton = (username: string) => {
    if (document.getElementById("view-on-opensauced-button")) {
        return;
    }

    const viewOnOpenSaucedButton = ViewOnOpenSaucedButton(username);

    const userBio = document.querySelector(
        `${GITHUB_PROFILE_USER_PROFILE_BIO_SELECTOR}, ${GITHUB_PROFILE_EDIT_MENU_SELECTOR}`,
    );

    userBio?.append(viewOnOpenSaucedButton);
};

export default injectViewOnOpenSaucedButton;
