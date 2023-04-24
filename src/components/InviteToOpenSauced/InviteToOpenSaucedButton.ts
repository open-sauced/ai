import logoIcon from "../../assets/opensauced-icon.svg";
import "../../content-scripts.css";
import { createHtmlElement } from "../../utils/createHtmlElement";

export const InviteToOpenSaucedButton = () => {
  const inviteToOpenSaucedButton = createHtmlElement("a", {
    className:
      "inline-block mt-4 text-white rounded-md p-2 text-sm font-semibold text-center select-none w-full border border-solid cursor-pointer bg-gh-gray hover:bg-red-500 hover:shadow-button hover:no-underline",
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
