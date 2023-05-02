import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";

export const AddPRToHighlightsButton = () => {
  const addPRToHighlightsButton = createHtmlElement("a", {
    href: "https://insights.opensauced.pizza/feed",
    target: "_blank",
    rel: "noopener noreferrer",
    innerHTML: `<md-header id="add-highlight-0" role="button" class="toolbar-item btn-octicon">
        <img class="octicon octicon-heading" height="16px" width="16px" src=${chrome.runtime.getURL(
          openSaucedLogoIcon,
        )}></md-header>
        <tool-tip for="add-highlight-0" role="tooltip">Add PR to OpenSauced highlights</tool-tip>`,
  });

  return addPRToHighlightsButton;
};
