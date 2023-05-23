import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";
import { getPullRequestAPIURL } from "../../../utils/urlMatchers";
import { getDescriptionContext, isOutOfContextBounds } from "../../../utils/fetchGithubAPIData";
import { generateDescription } from "../../../utils/aiprdescription/openai";
import { GITHUB_PR_COMMENT_TEXT_AREA_SELECTOR, SUPABASE_LOGIN_URL } from "../../../constants";
import { insertTextAtCursor } from "../../../utils/aiprdescription/cursorPositionInsert";
import { getAIDescriptionConfig } from "../../../utils/aiprdescription/descriptionconfig";
import { getAuthToken, isLoggedIn } from "../../../utils/checkAuthentication";

export const DescriptionGeneratorButton = () => {
  const descriptionGeneratorButton = createHtmlElement("a", {
    id: "ai-description-button",
    innerHTML: `<span id="ai-description-gen" class="toolbar-item btn-octicon">
    <img class="octicon octicon-heading" height="16px" width="16px" id="ai-description-button-logo" src=${chrome.runtime.getURL(openSaucedLogoIcon)}>
    </span>
    <tool-tip for="ai-description-gen">Generate PR description</tool-tip>`,
    onclick: handleSubmit,

  });

  return descriptionGeneratorButton;
};

const handleSubmit = async () => {
  try {
    if (!(await isLoggedIn())) {
      return window.open(SUPABASE_LOGIN_URL, "_blank");
    }
    const logo = document.getElementById("ai-description-button-logo");

    if (!logo) {
      return;
    }
    const url = getPullRequestAPIURL(window.location.href);
    const descriptionConfig = await getAIDescriptionConfig();

    if (!descriptionConfig) {
 return;
}
    if (!descriptionConfig.enabled) {
 return alert("AI PR description is disabled!");
}
    logo.classList.toggle("animate-spin");
    const [diff, commitMessages] = await getDescriptionContext(url, descriptionConfig.config.source);
    if(!diff && !commitMessages) {
      logo.classList.toggle("animate-spin");
      return alert(`No input context was generated.`)
    }
    if (isOutOfContextBounds([diff, commitMessages], descriptionConfig.config.maxInputLength)) {
      logo.classList.toggle("animate-spin");
      return alert(`Max input length exceeded. Try setting the description source to commit-messages.`);
    }
    const token = await getAuthToken();
    const descriptionStream = await generateDescription(
      token,
      descriptionConfig.config.language,
      descriptionConfig.config.length,
      descriptionConfig.config.temperature / 10,
      descriptionConfig.config.tone,
      diff,
      commitMessages,
    );

    logo.classList.toggle("animate-spin");
    if (!descriptionStream) {
      return console.error("No description was generated!");
    }
    const textArea = document.getElementsByName(GITHUB_PR_COMMENT_TEXT_AREA_SELECTOR)[0] as HTMLTextAreaElement;

    void insertTextAtCursor(textArea, descriptionStream);
  } catch (error: unknown) {
    if (error instanceof Error) {
 console.error("Description generation error:", error.message);
}
  }
};
