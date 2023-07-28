import { GITHUB_PR_SUGGESTION_TEXT_AREA_SELECTOR } from "../../../constants";
import { insertTextAtCursor } from "../../../utils/ai-utils/cursorPositionInsert";
import {
    DescriptionConfig,
    getAIDescriptionConfig,
} from "../../../utils/ai-utils/descriptionconfig";
import { getAuthToken, isLoggedIn, optLogIn } from "../../../utils/checkAuthentication";
import { createHtmlElement } from "../../../utils/createHtmlElement";
import { isOutOfContextBounds } from "../../../utils/fetchGithubAPIData";

type SuggestionGenerator = (
    token: string,
    code: string,
    config: DescriptionConfig
) => Promise<string | undefined>;

export const AICodeReviewMenu = (items: HTMLLIElement[]) => {
    const menu = createHtmlElement("div", {
        className: "SelectMenu js-slash-command-menu hidden mt-6",
        innerHTML: `<div class="SelectMenu-modal no-underline">
    <header class="SelectMenu-header">
       <div class="flex-1">
          <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" class="octicon octicon-code-square">
             <path d="M0 1.75C0 .784.784 0 1.75 0h12.5C15.216 0 16 .784 16 1.75v12.5A1.75 1.75 0 0 1 14.25 16H1.75A1.75 1.75 0 0 1 0 14.25Zm1.75-.25a.25.25 0 0 0-.25.25v12.5c0 .138.112.25.25.25h12.5a.25.25 0 0 0 .25-.25V1.75a.25.25 0 0 0-.25-.25Zm7.47 3.97a.75.75 0 0 1 1.06 0l2 2a.75.75 0 0 1 0 1.06l-2 2a.749.749 0 0 1-1.275-.326.749.749 0 0 1 .215-.734L10.69 8 9.22 6.53a.75.75 0 0 1 0-1.06ZM6.78 6.53 5.31 8l1.47 1.47a.749.749 0 0 1-.326 1.275.749.749 0 0 1-.734-.215l-2-2a.75.75 0 0 1 0-1.06l2-2a.751.751 0 0 1 1.042.018.751.751 0 0 1 .018 1.042Z"></path>
          </svg>
          <span class="color-fg-muted text-small pl-1">OpenSauced.ai</span>
       </div>
       <div class="Label Label--success">AI</div>
       <a class="ml-1 color-fg-muted d-block" target="_blank" href="https://github.com/orgs/open-sauced/discussions">
       Give feedback
       </a>
    </header>
    <div class="SelectMenu-list js-command-list-container" style="max-height: 270px;" id="combobox-5123">
       <ul role="listbox" class="SelectMenu-list js-slash-command-menu-items">
       </ul>
    </div>
 </div>`,
    });

    menu.querySelector("ul")?.append(...items);

    document.addEventListener("click", event => {
        if (event.target instanceof HTMLElement) {
            menu.classList.add("hidden");
        }
    });
    return menu;
};

export const AICodeReviewMenuItem = (title: string, description: string, suggestionGenerator: SuggestionGenerator, commentNode: HTMLElement) => {
    const menuItem = createHtmlElement("li", {
        className: "SelectMenu-item d-block slash-command-menu-item",
        role: "option",
        onclick: () => {
            void handleSubmit(suggestionGenerator, commentNode);
        },
        innerHTML: `<h5>${title}</h5>
      <span class="command-description">${description}</span>`,
    });

    return menuItem;
};

const handleSubmit = async (
    suggestionGenerator: SuggestionGenerator,
    commentNode: HTMLElement,
) => {
    const logo = commentNode.querySelector("#ai-description-button-logo");
    const button = commentNode.querySelector("#os-ai-change-gen");

    try {
        if (!(await isLoggedIn())) {
            return void optLogIn();
        }

        if (!logo || !button) {
            return;
        }

        const descriptionConfig = await getAIDescriptionConfig();

        if (!descriptionConfig) {
            return;
        }

        logo.classList.toggle("animate-spin");
        button.classList.toggle("pointer-events-none");

        const selectedLines = document.querySelectorAll(
            ".code-review.selected-line",
        );
        let selectedCode = Array.from(selectedLines)
            .map(line => line.textContent)
            .join("\n");

        // find input with name="position" and get its value
        if (!selectedCode) {
            const positionElement = commentNode.querySelector(
                "input[name=position]",
            )!;
            const position = positionElement.getAttribute("value")!;

            const codeDiv = document.querySelector(`[data-line-number="${position}"]`)
                ?.nextSibling?.nextSibling as HTMLElement;

            selectedCode =
        codeDiv.getElementsByClassName("blob-code-inner")[0].textContent!;
        }
        if (
            isOutOfContextBounds(
                [selectedCode, [] ],
                descriptionConfig.config.maxInputLength,
            )
        ) {
            logo.classList.toggle("animate-spin");
            return alert(
                `Max input length exceeded. Try reducing the number of selected lines to refactor.`,
            );
        }
        const token = await getAuthToken();
        const suggestionStream = await suggestionGenerator(
            token,
            selectedCode,
            descriptionConfig,
        );

        logo.classList.toggle("animate-spin");
        button.classList.toggle("pointer-events-none");
        if (!suggestionStream) {
            return console.error("No description was generated!");
        }
        const textArea = commentNode.querySelector(
            GITHUB_PR_SUGGESTION_TEXT_AREA_SELECTOR,
        )!;

        insertTextAtCursor(textArea as HTMLTextAreaElement, suggestionStream);
    } catch (error: unknown) {
        logo?.classList.toggle("animate-spin");
        button?.classList.toggle("pointer-events-none");

        if (error instanceof Error) {
            console.error("Description generation error:", error.message);
        }
    }
};
