import { GITHUB_PROFILE_MENU_SELECTOR } from "../../constants";
import { InviteToOpenSaucedButton } from "../../content-scripts/components/InviteToOpenSauced/InviteToOpenSaucedButton";
import { InviteToOpenSaucedModal } from "../../content-scripts/components/InviteToOpenSauced/InviteToOpenSaucedModal";
import { getTwitterUsername, getLinkedInUsername } from "../urlMatchers";

const injectOpenSaucedInviteButton = (username: string) => {
  const emailAddress = document
    .querySelector(`a[href^="mailto:"]`)
    ?.getAttribute("href")
    ?.replace("mailto:", "");
  const twitterUrl = document
    .querySelector(`a[href*="twitter.com"]`)
    ?.getAttribute("href");
  const linkedInUrl = document
    .querySelector(`a[href*="linkedin.com"]`)
    ?.getAttribute("href");

  if (!(emailAddress || twitterUrl || linkedInUrl)) {
    return;
  }

  const twitterUsername = twitterUrl && getTwitterUsername(twitterUrl);
  const linkedInUsername = linkedInUrl && getLinkedInUsername(linkedInUrl);
  const inviteToOpenSaucedButton = InviteToOpenSaucedButton();
  const inviteToOpenSaucedModal = InviteToOpenSaucedModal(
    username,
    {
      emailAddress,
      twitterUsername,
      linkedInUsername,
    },
    inviteToOpenSaucedButton,
  );

  const userBio = document.querySelector(GITHUB_PROFILE_MENU_SELECTOR);

  userBio?.append(inviteToOpenSaucedButton);
  document.body.appendChild(inviteToOpenSaucedModal);
};

export default injectOpenSaucedInviteButton;
