import { InviteToOpenSaucedButton } from "../../components/InviteToOpenSauced/InviteToOpenSaucedButton";
import { InviteToOpenSaucedModal } from "../../components/InviteToOpenSauced/InviteToOpenSaucedModal";
import { getTwitterUsername, getLinkedInUsername } from "../matchers";

const injectOpenSaucedInviteButton = (username: string) => {
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
  const inviteToOpenSaucedModal = InviteToOpenSaucedModal(username, {
    emailAddress,
    twitterUsername,
    linkedInUsername,
  });

  inviteToOpenSaucedButton.onclick = () => {
    inviteToOpenSaucedModal.style.display = "block";
  };

  const userBio = document.querySelector(".p-nickname.vcard-username.d-block");
  if (!userBio || !userBio.parentNode) return;
  userBio.parentNode.replaceChild(inviteToOpenSaucedButton, userBio);
  document.body.appendChild(inviteToOpenSaucedModal);
};

export default injectOpenSaucedInviteButton;
