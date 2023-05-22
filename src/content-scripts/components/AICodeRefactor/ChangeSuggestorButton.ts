import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";
import { GITHUB_PR_SUGGESTION_TEXT_AREA_SELECTOR, SUPABASE_LOGIN_URL } from "../../../constants";
import { generateCodeSuggestion } from "../../../utils/aiprdescription/openai";
import { isOutOfContextBounds } from "../../../utils/fetchGithubAPIData";
import { insertTextAtCursor } from "../../../utils/aiprdescription/cursorPositionInsert";
import { getAIDescriptionConfig } from "../../../utils/aiprdescription/descriptionconfig";
import { getAuthToken, isLoggedIn } from "../../../utils/checkAuthentication";

export const ChangeSuggestorButton = (commentNode: HTMLElement) => {
    const changeSuggestorButton = createHtmlElement("a", {
      innerHTML: `<span id="ai-change-gen" class="toolbar-item btn-octicon">
      <img class="octicon octicon-heading" height="16px" width="16px" id="ai-description-button-logo" src=${chrome.runtime.getURL(openSaucedLogoIcon)}>
      </span>
      <tool-tip for="ai-change-gen" class="sr-only" role="tooltip">Get Refactor Suggestions</tool-tip>`,
      onclick: async () => handleSubmit(commentNode),
    });

    return changeSuggestorButton;
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
        let selectedCode = Array.from(selectedLines).map(line => line.textContent)
                                                                        .join("\n");

        // find input with name="position" and get its value
        if (!selectedCode) {
          const positionElement = (commentNode.querySelector("input[name=position]")!);
          const position = positionElement.getAttribute("value")!;

          const codeDiv = document.querySelector(`[data-line-number="${position}"]`)?.nextSibling?.nextSibling as HTMLElement;

          selectedCode = codeDiv.getElementsByClassName("blob-code-inner")[0].textContent!;
        }
        if (isOutOfContextBounds([selectedCode, [] ], descriptionConfig.config.maxInputLength)) {
          logo.classList.toggle("animate-spin");
          return alert(`Max input length exceeded. Try reducing the number of selected lines to refactor.`);
        }
        const token = await getAuthToken();
        const suggestionStream = await generateCodeSuggestion(
            token,
            descriptionConfig.config.language,
            descriptionConfig.config.length,
            descriptionConfig.config.temperature / 10,
            selectedCode,
        );

        logo.classList.toggle("animate-spin");
        if (!suggestionStream) {
          return console.error("No description was generated!");
        }
        const textArea = commentNode.querySelector(GITHUB_PR_SUGGESTION_TEXT_AREA_SELECTOR)!;

        void insertTextAtCursor(textArea as HTMLTextAreaElement, suggestionStream);
      } catch (error: unknown) {
        if (error instanceof Error) {
     console.error("Description generation error:", error.message);
    }
      }
    };

