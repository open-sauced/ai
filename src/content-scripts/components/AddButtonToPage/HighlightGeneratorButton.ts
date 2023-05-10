import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";

export const HighlightGeneratorButton = () => {
  const addPRToHighlightsButton = createHtmlElement("a", {
    innerHTML: `<span id="ai-highlight-gen" class="toolbar-item btn-octicon">
    <img class="octicon octicon-heading" height="16px" width="16px" src=${chrome.runtime.getURL(openSaucedLogoIcon)}>
    </span>
    <tool-tip for="ai-highlight-gen">Generate highlight</tool-tip>`,
    href: "https://insights.opensauced.pizza/",
    target: "_blank",
    rel: "noopener noreferrer",
  });

  return addPRToHighlightsButton;
};
