import { GITHUB_PROFILE_USER_PROFILE_EDITABLE_AREA_SELECTOR } from "../../constants";
import { ViewOnOpenSaucedButton } from "../../content-scripts/components/ViewOnOpenSaucedButton/ViewOnOpenSaucedButton";

const injectViewOnOpenSaucedButton = (username: string) => {
    if (document.getElementById("view-on-opensauced-button")) {
        return;
    }

    const viewOnOpenSaucedButton = ViewOnOpenSaucedButton(username);

    const user = document.getElementsByClassName(
        GITHUB_PROFILE_USER_PROFILE_EDITABLE_AREA_SELECTOR,
    );
    const userDef = user[0] as HTMLElement;

    userDef.parentNode?.insertBefore(viewOnOpenSaucedButton, user[0]);
};

export default injectViewOnOpenSaucedButton;
