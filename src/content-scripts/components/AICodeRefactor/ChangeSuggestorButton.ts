import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";
import { generateCodeExplanation, generateCodeSuggestion, generateCodeTest } from "../../../utils/aiprdescription/openai";
import {
    AICodeReviewMenu,
    AICodeReviewMenuItem,
} from "../AICodeReviewMenu/AICodeReviewMenu";


export const ChangeSuggestorButton = (commentNode: HTMLElement) => {
    const changeSuggestorButton = createHtmlElement("a", {
        innerHTML: `<span id="ai-change-gen" class="toolbar-item btn-octicon">
      <img class="octicon octicon-heading" height="16px" width="16px" id="ai-description-button-logo" src=${chrome.runtime.getURL(
        openSaucedLogoIcon,
    )}>
      </span>`,
        onclick: (event: MouseEvent) => {
            event.stopPropagation();
            menu.classList.toggle("hidden");
        },
        id: "os-ai-change-gen",
    });

    const refactorCode = AICodeReviewMenuItem(
        "Refactor Code!",
        "Generate a code refactor",
        generateCodeSuggestion,
        commentNode,
    );
    const testCode = AICodeReviewMenuItem(
        "Test Code",
        "Generate a test for the code",
        generateCodeTest,
        commentNode,
    );
    const explainCode = AICodeReviewMenuItem(
        "Explain Code",
        "Generate an explanation for the code",
        generateCodeExplanation,
        commentNode,
    );

    const menu = AICodeReviewMenu([refactorCode, testCode, explainCode]);

    changeSuggestorButton.append(menu);
    return changeSuggestorButton;
};


