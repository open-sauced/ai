//import {USER_BIO_SELECTOR} from "../config.json";
import { InviteToOpenSaucedButton } from "../components/InviteToOpenSauced/InviteToOpenSaucedButton";
import { InviteToOpenSaucedModal } from "../components/InviteToOpenSauced/InviteToOpenSaucedModal";
import { getTwitterUsername } from "./matchers/tw-username-matcher";
import { getLinkedInUsername } from "./matchers/li-username-matcher";

const injectViewOnOS = (username: string) => {
  const mailAddress: string | undefined = (
    document.querySelector(`a[href^="mailto:"]`) as HTMLAnchorElement
  )?.href.substr(7);
  const twitterUrl: string | undefined = (
    document.querySelector(`a[href*="twitter.com"]`) as HTMLAnchorElement
  )?.href;
  const linkedInUrl: string | undefined = (
    document.querySelector(`a[href*="linkedin.com"]`) as HTMLAnchorElement
  )?.href;
  console.log(linkedInUrl);
  if (!(mailAddress || twitterUrl || linkedInUrl)) return;

  const twitterUsername = twitterUrl && getTwitterUsername(twitterUrl);
  const linkedInUsername = linkedInUrl && getLinkedInUsername(linkedInUrl);
  const inviteToOpenSaucedButton = InviteToOpenSaucedButton();
  const inviteToOpenSaucedModal = InviteToOpenSaucedModal(username, {
    mailAddress,
    twitterUsername,
    linkedInUsername,
  });

  inviteToOpenSaucedButton.onclick = () => {
    inviteToOpenSaucedModal.style.display = "block";
  };

  const userBio = document.querySelector(".p-note.user-profile-bio");
  if (!userBio) return;

  userBio.appendChild(inviteToOpenSaucedButton);
  document.body.appendChild(inviteToOpenSaucedModal);
};

export default injectViewOnOS;
