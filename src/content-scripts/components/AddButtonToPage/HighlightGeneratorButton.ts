import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";

export const HighlightGeneratorButton = () => {
  const addPRToHighlightsButton = createHtmlElement("a", {
    innerHTML: `<span aria-label="Generate highlight text for PR." data-view-component="true" class="tooltipped tooltipped-n">
    <img data-view-component="true" class="mr-1 mt-1" height="16px" width="16px" src=${chrome.runtime.getURL(openSaucedLogoIcon)}>
    </span>`,
  });

  return HighlightGeneratorButton;
};


const addPRToHighlightsButton = createHtmlElement("a", {
  innerHTML: `<span aria-label="Generate highlight text for PR." data-view-component="true" class="tooltipped tooltipped-n">
  <img data-view-component="true" class="mr-1 mt-1" height="16px" width="16px" src="https://github.com/open-sauced/assets/blob/main/logos/slice-Black.png">
  </span>`,
});