import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";
import { getPullRequestAPIURL } from "../../../utils/urlMatchers";
import { getPRDiff, getPRCommitMessages } from "../../../utils/aiprdescription/fetchGithubAPIData";
import { generateDescription } from "../../../utils/aiprdescription/openai";
import { GITHUB_PR_COMMENT_TEXT_AREA_SELECTOR } from "../../../constants";
import { insertAtCursorFromStream } from "../../../utils/aiprdescription/cursorPositionInsert";
import { getAIDescriptionConfig } from "../../../utils/aiprdescription/descriptionconfig";

export const DescriptionGeneratorButton = () => {
  const descriptionGeneratorButton = createHtmlElement("a", {
    innerHTML: `<span id="ai-description-gen" class="toolbar-item btn-octicon">
    <img class="octicon octicon-heading" height="16px" width="16px" id="ai-description-button-logo" src=${chrome.runtime.getURL(openSaucedLogoIcon)}>
    </span>
    <tool-tip for="ai-description-gen">Generate PR description</tool-tip>`,
    onclick: async () => {
      const logo = document.getElementById("ai-description-button-logo");
      if (!logo) {
        return alert("Logo not found!");
      }
      const url = getPullRequestAPIURL(window.location.href);
      const descriptionConfig = await getAIDescriptionConfig();
      if (!descriptionConfig ) return;
      if (!descriptionConfig.enabled) return alert("AI PR description is disabled!");
      logo.classList.toggle("animate-pulse");
      //TODO: Conditionally fetch diff and commit messages based on config
      const [diff, commitMessages] = await Promise.all([getPRDiff(url), getPRCommitMessages(url)]);
      const descriptionStream = await generateDescription(descriptionConfig.config.openai_api_key!,
        "gpt-3.5-turbo",
        descriptionConfig.config.language,
        descriptionConfig.config.length,
        descriptionConfig.config.temperature / 10,
        descriptionConfig.config.tone, diff, commitMessages
      );

      logo.classList.toggle("animate-pulse");
      if (!descriptionStream) {
        return alert("No description was generated!");
      }
      const textArea = document.getElementsByName(GITHUB_PR_COMMENT_TEXT_AREA_SELECTOR)[0] as HTMLTextAreaElement;

      void insertAtCursorFromStream(textArea, descriptionStream);
    },

  });

  return descriptionGeneratorButton;
};
