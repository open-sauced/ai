import "../../index.css";
import { TEST } from "../../config.json";

interface Socials {
  mailAddress?: string;
  twitterUsername?: string;
  linkedInUsername?: string;
}

export const InviteToOpenSaucedModal = (
  username: string,
  { mailAddress, twitterUsername, linkedInUsername }: Socials = {}
) => {
  //TODO: Conditionally render social icons
  const socialIcons = `<span class="flex flex-nowrap space-x-3"> <a href="https://github.com/bdougie">
    <img src="https://images.weserv.nl/?url=cdn4.iconfinder.com/data/icons/miu-flat-social/60/mail-512.png&h=60&w=60&fit=cover&mask=circle" alt="Email">
  </a>
  <a href="https://github.com/bdougie">
  <img src="https://images.weserv.nl/?url=cdn4.iconfinder.com/data/icons/social-media-icons-the-circle-set/48/twitter_circle-512.png&h=60&w=60&fit=cover&mask=circle" alt="Twitter">
</a>
<a href="https://github.com/bdougie">
<img src="https://images.weserv.nl/?url=cdn1.iconfinder.com/data/icons/logotypes/32/circle-linkedin-512.png&h=60&w=60&fit=cover&mask=circle" alt="LinkedIn">
</a>
</span>`;

  const inviteToOpenSaucedModal = document.createElement("div");
  Object.assign(inviteToOpenSaucedModal, {
    className:
      "fixed h-full w-full z-50 bg-gray-600 bg-opacity-50 overflow-y-auto  inset-0 ",
    style: "display: none;",
    id: "invite-modal",
    innerHTML: `<div
        class="min-w-[30%] relative top-60 mx-auto p-4 border w-96 rounded-md shadow-button border-solid border-orange bg-slate-800"
    >
        <div class="mt-2 text-left">
            <h3 class="text-2xl leading-6 font-bold">Invite to OpenSauced!</h3>
            <div class="mt-2">
                <p class="text-sm">
                    Use the social icons below to invite ${username} to OpenSauced.
                </p>
            </div>
            ${socialIcons}
        </div>
    </div>`,
  });
  return inviteToOpenSaucedModal;
};
