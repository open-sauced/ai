import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";
import { GITHUB_PR_SUGGESTION_TEXT_AREA_SELECTOR, OPEN_AI_COMPLETION_MODEL_NAME, SUPABASE_LOGIN_URL } from "../../../constants";
import { generateCodeSuggestion } from "../../../utils/aiprdescription/openai";
import { isContextWithinBounds } from "../../../utils/fetchGithubAPIData";
import { insertAtCursorFromStream } from "../../../utils/aiprdescription/cursorPositionInsert";
import { getAIDescriptionConfig } from "../../../utils/aiprdescription/descriptionconfig";
import { isLoggedIn } from "../../../utils/checkAuthentication";

export const ChangeSuggestorButton = (commentNode: HTMLElement) => {
    const changeSuggestoreButton = createHtmlElement("a", {
      innerHTML: `<span id="ai-change-gen" class="toolbar-item btn-octicon">
      <img class="octicon octicon-heading" height="16px" width="16px" id="ai-description-button-logo" src=${chrome.runtime.getURL(openSaucedLogoIcon)}>
      </span>
      <tool-tip for="ai-change-gen" class="sr-only" role="tooltip">Get Refactor Suggestions</tool-tip>`,
      onclick: async () => handleSubmit(commentNode),
    });

    return changeSuggestoreButton;
  };

const handleSubmit = async (commentNode: HTMLElement) => {
    try {
        if (!(await isLoggedIn())) {
          return window.open(SUPABASE_LOGIN_URL, "_blank");
        }
        const logo = document.getElementById("ai-description-button-logo");

        if (!logo) {
          return;
        }

        const descriptionConfig = await getAIDescriptionConfig();

        if (!descriptionConfig) {
            return;
        }
        if (!descriptionConfig.enabled) {
            return alert("AI PR description is disabled!");
        }

        logo.classList.toggle("animate-spin");

        const selectedLines = document.querySelectorAll(".code-review.selected-line");
        const selectedCode = Array.from(selectedLines).map(line => line.textContent)
                                                                        .join("\n");

        if (!isContextWithinBounds([selectedCode, [] ], descriptionConfig.config.maxInputLength)) {
          logo.classList.toggle("animate-spin");
          return alert(`Max input length exceeded. Try reducing the number of selected lines to refactor.`);
        }
        const suggestionStream = await generateCodeSuggestion(
            descriptionConfig.config.openai_api_key,
            OPEN_AI_COMPLETION_MODEL_NAME,
            descriptionConfig.config.language,
            descriptionConfig.config.length,
            descriptionConfig.config.temperature / 10,
            descriptionConfig.config.tone,
            selectedCode,
        );

        logo.classList.toggle("animate-spin");
        if (!suggestionStream) {
          return console.error("No description was generated!");
        }
        const textArea = commentNode.querySelector(GITHUB_PR_SUGGESTION_TEXT_AREA_SELECTOR)!;

        void insertAtCursorFromStream(textArea as HTMLTextAreaElement, suggestionStream);
      } catch (error: unknown) {
        if (error instanceof Error) {
     console.error("Description generation error:", error.message);
    }
      }
    };

