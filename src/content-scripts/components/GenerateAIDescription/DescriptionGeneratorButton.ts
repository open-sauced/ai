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
    const logo = document.getElementById("ai-description-button-logo");
    const button = document.getElementById("ai-description-button");

    try {
        if (!(await isLoggedIn())) {
            return window.open(SUPABASE_LOGIN_URL, "_blank");
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


        const { protocol, hostname, pathname } = window.location;
        const descriptionStream = await getAiDescription(`${protocol}//${hostname}${pathname}`);

        logo.classList.toggle("animate-spin");
        button.classList.toggle("pointer-events-none");

        const textArea = document.getElementsByName(GITHUB_PR_COMMENT_TEXT_AREA_SELECTOR)[0] as HTMLTextAreaElement;

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

    if (!descriptionConfig.enabled) {
        throw new Error("AI PR description is disabled!");
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


