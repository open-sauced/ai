import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";

export const AddPRToHighlightsButton = () => {
  const addPRToHighlightsButton = createHtmlElement("a", {
    className: "relative",
    innerHTML: `<span aria-label="Add PR to OpenSauced highlights" class="tooltipped tooltipped-n">
    <img class="mr-1 mt-1" height="16px" width="16px" src=${chrome.runtime.getURL(
      openSaucedLogoIcon,
    )}>
    </span>
    <details-menu class="dropdown-menu dropdown-menu-sw color-fg-default w-48 mt-2">
    <a href="https://insights.opensauced.pizza/feed?prurl=${encodeURIComponent(window.location.href)}" class="dropdown-item" target="_blank">
      + Add PR to Highlights
    </a>
  </details-menu>`,
  });

  return addPRToHighlightsButton;
};
