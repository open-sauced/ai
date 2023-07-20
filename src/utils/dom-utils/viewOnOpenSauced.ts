import {
  GITHUB_PROFILE_USER_PROFILE_EDITABLE_AREA_SELECTOR,
  GITHUB_PROFILE_EDIT_MENU_SELECTOR,
} from "../../constants";
import { ViewOnOpenSaucedButton } from "../../content-scripts/components/ViewOnOpenSaucedButton/ViewOnOpenSaucedButton";

const injectViewOnOpenSaucedButton = (username: string) => {
  if (document.getElementById("view-on-opensauced-button")) {
    return;
  }

  const viewOnOpenSaucedButton = ViewOnOpenSaucedButton(username);

  const userBio = document.querySelector(
    `${GITHUB_PROFILE_USER_PROFILE_EDITABLE_AREA_SELECTOR}
    , ${GITHUB_PROFILE_EDIT_MENU_SELECTOR}`
  );
  const user = document.getElementsByClassName(
    "js-profile-editable-area d-flex flex-column d-md-block"
  );
  user[0]?.parentNode.insertBefore(viewOnOpenSaucedButton, user[0]);
};

export default injectViewOnOpenSaucedButton;
