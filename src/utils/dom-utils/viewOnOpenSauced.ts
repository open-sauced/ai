import {
  GITHUB_PROFILE_MENU_SELECTOR,
  GITHUB_PROFILE_EDIT_MENU_SELECTOR,
} from "../../constants";
import { ViewOnOpenSaucedButton } from "../../content-scripts/components/ViewOnOpenSaucedButton/ViewOnOpenSaucedButton";
import { ColorScheme, prefersDarkMode } from "../colorPreference";

const injectViewOnOpenSaucedButton = (
  username: string,
  colorScheme: ColorScheme
) => {
  const viewOnOpenSaucedButton = ViewOnOpenSaucedButton(username);

  const darkMode = prefersDarkMode(colorScheme);
  const userBio = document.querySelector(
    `${GITHUB_PROFILE_MENU_SELECTOR}, ${GITHUB_PROFILE_EDIT_MENU_SELECTOR}`
  );
  if (!userBio || !userBio.parentNode) return;
  if (darkMode) userBio.parentElement?.classList.add("dark");
  userBio.parentNode.replaceChild(viewOnOpenSaucedButton, userBio);
};

export default injectViewOnOpenSaucedButton;
