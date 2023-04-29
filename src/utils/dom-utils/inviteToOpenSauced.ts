import { GITHUB_PROFILE_MENU_SELECTOR } from "../../constants";
import { InviteToOpenSaucedButton } from "../../content-scripts/components/InviteToOpenSauced/InviteToOpenSaucedButton";
import { InviteToOpenSaucedModal } from "../../content-scripts/components/InviteToOpenSauced/InviteToOpenSaucedModal";
import { getTwitterUsername, getLinkedInUsername } from "../urlMatchers";

const injectOpenSaucedInviteButton = (username: string) => {
  const emailAddress: string | undefined = (() => {
    const element = document.querySelector(`a[href^="mailto:"]`);

    if (element instanceof HTMLAnchorElement) {
      return element.href;
    }
    return undefined;
  })();
  const twitterUrl: string | undefined = (() => {
    const element = document.querySelector(`a[href*="twitter.com"]`);

    if (element instanceof HTMLAnchorElement) {
      return element.href;
    }
    return undefined;
  })();
  const linkedInUrl: string | undefined = (() => {
    const element = document.querySelector(`a[href*="linkedin.com"]`);

    if (element instanceof HTMLAnchorElement) {
      return element.href;
    }
    return undefined;
  })();

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

  if (!userBio?.parentNode) {
 return;
}
  if (userBio.lastChild?.isEqualNode(inviteToOpenSaucedButton)) {
 return;
}
  userBio.append(inviteToOpenSaucedButton);
  document.body.appendChild(inviteToOpenSaucedModal);
};

export default injectOpenSaucedInviteButton;
