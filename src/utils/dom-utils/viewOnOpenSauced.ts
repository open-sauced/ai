import { ViewOnOpenSaucedButton } from "../../content-scripts/components/ViewOnOpenSaucedButton/ViewOnOpenSaucedButton";

const injectViewOnOpenSaucedButton = (username: string) => {
    if (document.getElementById("view-on-opensauced-button")) {
        return;
    }

    const viewOnOpenSaucedButton = ViewOnOpenSaucedButton(username);

    const editProfileButtonSelector = ".btn-block.js-profile-editable-edit-button"
    const editProfileButton = document.querySelector(editProfileButtonSelector);

    if (editProfileButton) {
        editProfileButton.parentNode?.insertBefore(viewOnOpenSaucedButton, editProfileButton)
    } else {
        const callToActionButtonsArea = document.querySelector(".js-user-profile-follow-button")?.closest(".flex-order-1.flex-md-order-none")
        callToActionButtonsArea?.insertBefore(viewOnOpenSaucedButton, callToActionButtonsArea?.firstChild);
    }
};

export default injectViewOnOpenSaucedButton;
