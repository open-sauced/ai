import { GITHUB_PROFILE_MENU_SELECTOR } from "../../constants";
import { InviteToOpenSaucedButton } from "../../content-scripts/components/InviteToOpenSauced/InviteToOpenSaucedButton";
import { InviteToOpenSaucedModal } from "../../content-scripts/components/InviteToOpenSauced/InviteToOpenSaucedModal";
import { getTwitterUsername, getLinkedInUsername } from "../urlMatchers";
import { ColorScheme, prefersDarkMode } from "../colorPreference";

const injectOpenSaucedInviteButton = (
  username: string,
  colorScheme: ColorScheme
) => {
  const emailAddress: string | undefined = (
    document.querySelector(`a[href^="mailto:"]`) as HTMLAnchorElement
  )?.href.substr(7);
  const twitterUrl: string | undefined = (
    document.querySelector(`a[href*="twitter.com"]`) as HTMLAnchorElement
  )?.href;
  const linkedInUrl: string | undefined = (
    document.querySelector(`a[href*="linkedin.com"]`) as HTMLAnchorElement
  )?.href;
  if (!(emailAddress || twitterUrl || linkedInUrl)) return;

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
    inviteToOpenSaucedButton
  );

  const darkMode = prefersDarkMode(colorScheme);
  const userBio = document.querySelector(GITHUB_PROFILE_MENU_SELECTOR);
  if (!userBio || !userBio.parentNode) return;
  if (darkMode) userBio.parentElement?.classList.add("dark");
  if(userBio.lastChild?.isEqualNode(inviteToOpenSaucedButton)) return;
  userBio.append(inviteToOpenSaucedButton);
  document.body.appendChild(inviteToOpenSaucedModal);
};

export default injectOpenSaucedInviteButton;
