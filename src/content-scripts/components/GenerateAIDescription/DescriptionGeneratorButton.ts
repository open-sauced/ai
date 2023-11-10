import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/opensauced-icon.svg";
import { getPullRequestAPIURL } from "../../../utils/urlMatchers";
import { getDescriptionContext, isOutOfContextBounds } from "../../../utils/fetchGithubAPIData";
import { generateDescription } from "../../../utils/ai-utils/openai";
import { insertTextAtCursor } from "../../../utils/ai-utils/cursorPositionInsert";
import { getAIDescriptionConfig } from "../../../utils/ai-utils/descriptionconfig";
import { getAuthToken, isLoggedIn, optLogIn } from "../../../utils/checkAuthentication";

export const DescriptionGeneratorButton = (number: number) => {
    const descriptionGeneratorButton = createHtmlElement("a", {
        id: `ai-description-button-${number}`,
        innerHTML: `<span id="ai-description-gen" class="toolbar-item btn-octicon">
    <img class="octicon octicon-heading" height="16px" width="16px" id="ai-description-button-logo" src=${chrome.runtime.getURL(openSaucedLogoIcon)}>
    </span>
    <tool-tip for="ai-description-gen" popover="manual">Generate PR description</tool-tip>`,
        onclick: handleSubmit,
    });

    return descriptionGeneratorButton;
};

const handleSubmit = async (event: Event) => {
    const button = event.currentTarget as HTMLElement;
    const logo = button.querySelector("#ai-description-button-logo");


    try {
        if (!(await isLoggedIn())) {
            return void optLogIn();
        }

        const descriptionConfig = await getAIDescriptionConfig();

        if (!descriptionConfig) {
            return;
        }

        logo?.classList.toggle("animate-spin");
        button.classList.toggle("pointer-events-none");


        const { protocol, hostname, pathname } = window.location;
        const descriptionStream = await getAiDescription(`${protocol}//${hostname}${pathname}`);

        logo?.classList.toggle("animate-spin");
        button.classList.toggle("pointer-events-none");

        const textArea = button.closest(".Box.CommentBox")?.querySelector("textArea");

        insertTextAtCursor(textArea, descriptionStream);
    } catch (error: unknown) {
        logo?.classList.toggle("animate-spin");
        button?.classList.toggle("pointer-events-none");

        if (error instanceof Error) {
            alert(error.message);
            console.error("Description generation error:", error.message);
        }
    }
};

export const getAiDescription = async (prUrl: string) => {
    const prApiUrl = await getPullRequestAPIURL(prUrl);

    const descriptionConfig = await getAIDescriptionConfig();

    if (!descriptionConfig) {
        throw new Error("Configuration file is empty!");
    }

    const [diff, commitMessages] = await getDescriptionContext(prApiUrl, descriptionConfig.config.source);

    if (!diff && !commitMessages) {
        throw new Error(`No input context was generated.`);
    }
    if (isOutOfContextBounds([diff, commitMessages], descriptionConfig.config.maxInputLength)) {
        throw new Error(`Max input length exceeded. Try setting the description source to commit-messages.`);
    }
    const token = await getAuthToken();
    const description = await generateDescription(
        token,
        descriptionConfig.config.language,
        descriptionConfig.config.length,
        descriptionConfig.config.temperature / 10,
        descriptionConfig.config.tone,
        diff,
        commitMessages,
    );

    if (!description) {
        throw new Error("No description was generated!");
    }

    return description;
};


