import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";
import { getPullRequestAPIURL } from "../../../utils/urlMatchers";
import { getPRDiff, getPRCommitMessages } from "../../../utils/aiprdescription/fetchGithubAPIData";
import { generateDescription } from "../../../utils/aiprdescription/openai";
import { GITHUB_PR_COMMENT_TEXT_AREA_SELECTOR } from "../../../constants";
import { insertAtCursorFromStream } from "../../../utils/aiprdescription/cursorPositionInsert";

export const DescriptionGeneratorButton = () => {
  const descriptionGeneratorButton = createHtmlElement("a", {
    innerHTML: `<span id="ai-description-gen" class="toolbar-item btn-octicon">
    <img class="octicon octicon-heading" height="16px" width="16px" id="ai-description-button-logo" src=${chrome.runtime.getURL(openSaucedLogoIcon)}>
    </span>
    <tool-tip for="ai-description-gen">Generate PR description</tool-tip>`,
    onclick: async (e: MouseEvent) => {
      const logo = document.getElementById("ai-description-button-logo");
      if(!logo) return alert("Logo not found!");
      const url = getPullRequestAPIURL(window.location.href);
      logo.classList.toggle("animate-pulse");
      const [diff, commitMessages] = await Promise.all([getPRDiff(url), getPRCommitMessages(url)]);
      const descriptionStream = await generateDescription("", "gpt-3.5-turbo", "english", 300, 0.7, "informative", diff);
      logo.classList.toggle("animate-pulse");
      if(!descriptionStream) return alert("No description was generated!");
      const textArea = document.getElementsByName(GITHUB_PR_COMMENT_TEXT_AREA_SELECTOR)[0] as HTMLTextAreaElement;
      if(!textArea) return alert("Comment box not found!");
      void insertAtCursorFromStream(textArea, descriptionStream);
    }

  });

  return descriptionGeneratorButton;
};
