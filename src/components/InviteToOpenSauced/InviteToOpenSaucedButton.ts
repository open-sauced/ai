import logoIcon from "../../assets/opensauced-icon.svg";
import "../../index.css";
import { createHtmlElement } from "../../utils/createHtmlElement";

export const InviteToOpenSaucedButton = () => {
  const inviteToOpenSaucedButton = createHtmlElement("a", {
    className:
      "inline-block mt-4 mb-1 text-white rounded-md p-2 no-underline text-md font-semibold text-center select-none w-full border border-solid cursor-pointer border-orange hover:shadow-button hover:no-underline",
    innerHTML: `<img
          class="mx-2 inline-block align-top"
          src="${chrome.runtime.getURL(logoIcon)}"
          alt="OpenSauced Logo"
          width="20"
          height="20"
        />
        <span>Invite to OpenSauced</span>
        `,
  });
  return inviteToOpenSaucedButton;
};
