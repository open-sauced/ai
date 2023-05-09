import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";

export const HighlightGeneratorButton = () => {
  const addPRToHighlightsButton = createHtmlElement("p", {
    innerHTML: `<span aria-label="Generate highlight text for PR." data-view-component="true" class="tooltipped tooltipped-n">
    <img data-view-component="true" class="mr-1 mt-1" height="16px" width="16px" src=${chrome.runtime.getURL(openSaucedLogoIcon)}>
    </span>`,
  });

  return HighlightGeneratorButton;
};
