import {
  GITHUB_PROFILE_MENU_SELECTOR,
  GITHUB_PROFILE_EDIT_MENU_SELECTOR,
} from "../../constants";
import { ViewOnOpenSaucedButton } from "../../content-scripts/components/ViewOnOpenSaucedButton/ViewOnOpenSaucedButton";

const injectViewOnOpenSaucedButton = (username: string) => {
  const viewOnOpenSaucedButton = ViewOnOpenSaucedButton(username);

  const userBio = document.querySelector(
    `${GITHUB_PROFILE_MENU_SELECTOR}, ${GITHUB_PROFILE_EDIT_MENU_SELECTOR}`,
  );

  if (userBio?.lastChild?.isEqualNode(viewOnOpenSaucedButton)) {
 return;
}
  userBio?.append(viewOnOpenSaucedButton);
};

export default injectViewOnOpenSaucedButton;
