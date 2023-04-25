import { ViewOnOpenSaucedButton } from "../../components/ViewOnOpenSaucedButton/ViewOnOpenSaucedButton";
import { GITHUB_PROFILE_MENU_SELECTOR, GITHUB_PROFILE_EDIT_MENU_SELECTOR } from "../../constants";

const injectViewOnOpenSaucedButton = (username: string) => {
  const viewOnOpenSaucedButton = ViewOnOpenSaucedButton(username);

  const userBio = document.querySelector(
    `${GITHUB_PROFILE_MENU_SELECTOR}, ${GITHUB_PROFILE_EDIT_MENU_SELECTOR}`
  );
  if (!userBio || !userBio.parentNode) return;
  userBio.parentNode.replaceChild(viewOnOpenSaucedButton, userBio);
};

export default injectViewOnOpenSaucedButton;
