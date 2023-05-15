import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";
import { getPullRequestAPIURL } from "../../../utils/urlMatchers";
import { getPRDiff, getPRCommitMessages } from "../../../utils/aiprdescription/fetchGithubAPIData";
import { generateDescription } from "../../../utils/aiprdescription/openai";
import { GITHUB_PR_COMMENT_TEXT_AREA_SELECTOR } from "../../../constants";
import { insertAtCursor } from "../../../utils/aiprdescription/cursorPositionInsert";

export const DescriptionGeneratorButton = () => {
  const descriptionGeneratorButton = createHtmlElement("a", {
    innerHTML: `<span id="ai-description-gen" class="toolbar-item btn-octicon">
    <img class="octicon octicon-heading" height="16px" width="16px" src=${chrome.runtime.getURL(openSaucedLogoIcon)}>
    </span>
    <tool-tip for="ai-description-gen">Generate PR description</tool-tip>`,
    onclick: async (e: MouseEvent) => {

      const url = getPullRequestAPIURL(window.location.href);
      const [diff, commitMessages] = await Promise.all([getPRDiff(url), getPRCommitMessages(url)]);
      //TODO: Get from user-config
      const description = await generateDescription("", "gpt-3.5-turbo", "english", 300, 0.7, "informative", diff);
      if(!description) return alert("No description was generated!");
      // TODO: Typewriter
      const textArea = document.getElementsByName(GITHUB_PR_COMMENT_TEXT_AREA_SELECTOR)[0] as HTMLTextAreaElement;
      if(!textArea) return alert("Comment box not found!");
      insertAtCursor(textArea, description);
    }

  });

  return descriptionGeneratorButton;
};
