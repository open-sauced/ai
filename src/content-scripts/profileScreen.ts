import { getGithubUsername } from "../utils/getDetailsFromGithubUrl";
import { getOpenSaucedUser } from "../utils/fetchOpenSaucedApiData";
import { ViewOnOpenSaucedButton } from "../components/ViewOnOpenSaucedButton/ViewOnOpenSaucedButton";

function injectViewOnOpenSaucedButton() {
  const username = getGithubUsername(window.location.href);
  if (!username) {
    return;
  }

  const openSaucedUser = getOpenSaucedUser(username);
  if (!openSaucedUser) {
    return;
  }

  const viewOnOpenSaucedButton = ViewOnOpenSaucedButton(username);

  const userBio = document.querySelector(".p-note.user-profile-bio");
  if (!userBio) {
    return;
  }
  userBio.appendChild(viewOnOpenSaucedButton);
}

injectViewOnOpenSaucedButton();
