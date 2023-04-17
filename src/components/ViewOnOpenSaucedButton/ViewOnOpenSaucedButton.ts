import { getGithubUsername } from "../../utils/getDetailsFromGithubUrl";
import { getOpenSaucedUser } from "../../utils/fetchOpenSaucedApiData";
import logoIcon from "../../assets/opensauced-icon.svg";
import "./ViewOnOpenSaucedButton.css";

function injectViewOnOpenSaucedButton() {
  const username = getGithubUsername(window.location.href);
  if (!username) {
    return;
  }

  const openSaucedUser = getOpenSaucedUser(username);
  if (!openSaucedUser) {
    return;
  }

  const viewOnOpenSaucedButton = document.createElement("a");
  viewOnOpenSaucedButton.href = `https://insights.opensauced.pizza/user/${username}/contributions`;
  viewOnOpenSaucedButton.className = "user-opensauced-link";
  viewOnOpenSaucedButton.target = "_blank";
  viewOnOpenSaucedButton.rel = "noopener noreferrer";
  viewOnOpenSaucedButton.innerHTML = `
    <img class="opensauced-icon" src="${chrome.runtime.getURL(
      logoIcon
    )}" alt="OpenSauced Logo" />
    <span>View On OpenSauced</span>
    `;

  const userBio = document.querySelector(".p-note.user-profile-bio");
  if (!userBio) {
    return;
  }
  userBio.appendChild(viewOnOpenSaucedButton);
}

injectViewOnOpenSaucedButton();
