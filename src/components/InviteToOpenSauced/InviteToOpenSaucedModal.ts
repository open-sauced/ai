import "../../index.css";
import { createHtmlElement } from "../../utils/createHtmlElement";
import emailSocialIcon from "../../assets/mail-icon.svg";
import twitterSocialIcon from "../../assets/twitter-icon.svg";
import linkedInSocailIcon from "../../assets/linkedin-icon.svg";

interface Socials {
  emailAddress?: string;
  twitterUsername?: string;
  linkedInUsername?: string;
}

export const InviteToOpenSaucedModal = (
  username: string,
  { emailAddress, twitterUsername, linkedInUsername }: Socials = {}
) => {
  const emailIcon = emailAddress ? createHtmlElement("a", {
    href: `mailto:${emailAddress}`,
    innerHTML: `<img src=${chrome.runtime.getURL(emailSocialIcon)} alt="Email">`,
  }) : "";
  const twitterIcon = twitterUsername ? createHtmlElement("a", {
    href: `https://twitter.com/${twitterUsername}`,
    innerHTML: `<img src=${chrome.runtime.getURL(twitterSocialIcon)} alt="Twitter">`,
  }) : "";
  const linkedInIcon = linkedInUsername ? createHtmlElement("a", {
    href: `https://www.linkedin.com/in/${linkedInUsername}`,
    innerHTML: `<img src=${chrome.runtime.getURL(linkedInSocailIcon)} alt="LinkedIn">`,
  }) : "";

  const socialIcons = createHtmlElement("span", {
    className: "flex flex-nowrap space-x-3",
  });

  const inviteToOpenSaucedModal = createHtmlElement("div", {
    className:
      "fixed h-full w-full z-50 bg-gray-600 bg-opacity-50 overflow-y-auto inset-0",
    style: { display: "none" },
    id: "invite-modal",
  });

  const inviteToOpenSaucedModalContainer = createHtmlElement("div", {
    className:
      "mt-2 text-left min-w-[30%] relative top-60 mx-auto p-4 border w-96 rounded-md shadow-button border-solid border-orange bg-slate-800",
    innerHTML: `
    <h3 class="text-2xl leading-6 font-bold">Invite ${username} to OpenSauced!</h3>
    <div class="mt-2">
       <p class="text-sm">
          Use the social icons below to invite them to OpenSauced.
       </p>
    </div>
`,
  });

  socialIcons.replaceChildren(emailIcon, twitterIcon, linkedInIcon);
  inviteToOpenSaucedModalContainer.appendChild(socialIcons);
  inviteToOpenSaucedModal.appendChild(inviteToOpenSaucedModalContainer);

  return inviteToOpenSaucedModal;
};
