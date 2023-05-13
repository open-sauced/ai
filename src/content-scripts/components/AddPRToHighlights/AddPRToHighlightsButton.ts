import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";

export const AddPRToHighlightsButton = () => {
  const addPRToHighlightsButton = createHtmlElement("a", {
    href: `https://insights.opensauced.pizza/feed?url=${encodeURIComponent(window.location.href)}`,
    target: "_blank",
    rel: "noopener noreferrer",
    innerHTML: `<span aria-label="Add PR to OpenSauced highlights." data-view-component="true" class="tooltipped tooltipped-n">
    <img data-view-component="true" class="mr-1 mt-1" height="16px" width="16px" src=${chrome.runtime.getURL(openSaucedLogoIcon)}>
    </span>`,
  });

  return addPRToHighlightsButton;
};
