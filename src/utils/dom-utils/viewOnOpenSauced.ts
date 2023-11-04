import { GITHUB_PROFILE_USER_PROFILE_EDITABLE_AREA_SELECTOR } from "../../constants";
import { ViewOnOpenSaucedButton } from "../../content-scripts/components/ViewOnOpenSaucedButton/ViewOnOpenSaucedButton";

const injectViewOnOpenSaucedButton = (username: string) => {
    if (document.getElementById("view-on-opensauced-button")) {
        return;
    }

    const viewOnOpenSaucedButton = ViewOnOpenSaucedButton(username);

    const userEditableArea = document.getElementsByClassName(
        GITHUB_PROFILE_USER_PROFILE_EDITABLE_AREA_SELECTOR,
    );
    const editableAreaElement = userEditableArea[0];
    const editProfileButtonSelector = ".btn-block.js-profile-editable-edit-button"
    const editProfileButton = document.querySelector(editProfileButtonSelector);
    if (editProfileButton) {
        editProfileButton.parentNode?.insertBefore(viewOnOpenSaucedButton, editProfileButton)
    } else {
        const ButtonArea = document.querySelector(".js-user-profile-follow-button")?.closest(".flex-order-1.flex-md-order-none")
        ButtonArea?.insertBefore(viewOnOpenSaucedButton, ButtonArea?.firstChild);
    }
};

export default injectViewOnOpenSaucedButton;
