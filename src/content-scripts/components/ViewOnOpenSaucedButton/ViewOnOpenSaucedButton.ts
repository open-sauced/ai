import logoIcon from "../../../assets/opensauced-icon.svg";
import "../../content-scripts.css";
import { createHtmlElement } from "../../../utils/createHtmlElement";

export const ViewOnOpenSaucedButton = (username: string) => {
  const viewOnOpenSaucedButton = createHtmlElement("a", {
    href: `https://insights.opensauced.pizza/user/${username}/contributions`,
    className:
      "inline-block mt-4 text-white rounded-md p-2 text-sm font-semibold text-center select-none w-full border border-solid cursor-pointer border-orange hover:shadow-button hover:no-underline",
    target: "_blank",
    rel: "noopener noreferrer",
    innerHTML: `
    <img
      class="mx-2 inline-block align-top"
      src="${chrome.runtime.getURL(logoIcon)}"
      alt="OpenSauced Logo"
      width="20"
      height="20"
    />
    <span>View On OpenSauced</span>
    `,
  });
  return viewOnOpenSaucedButton;
};
