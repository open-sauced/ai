import { DescriptionGeneratorButton } from "../../content-scripts/components/GenerateAIDescription/DescriptionGeneratorButton";
import { GITHUB_NEW_PR_COMMENT_EDITOR_SELECTOR, GITHUB_PR_COMMENT_EDITOR_SELECTOR } from "../../constants";
import { isGithubPullRequestPage } from "../urlMatchers";
import { isPublicRepository } from "../fetchGithubAPIData";
import { SettingsConfig } from "../../popup/pages/settings";

const injectDescriptionGeneratorButton = async () => {
    if (document.getElementById("ai-description-button") || !(await isPublicRepository(window.location.href))) {
        return;
    }

    const settingsConfig = await new Promise(resolve => {
        chrome.storage.sync.get("osSettingsConfig", result => {
            resolve(result.osSettingsConfig);
        });
    });

    if (settingsConfig) {
        const { aiPrDescription } = settingsConfig as SettingsConfig;

        if (!aiPrDescription) {
            return;
        }
    }

    const selector = isGithubPullRequestPage(window.location.href) ? GITHUB_PR_COMMENT_EDITOR_SELECTOR : GITHUB_NEW_PR_COMMENT_EDITOR_SELECTOR;
    const commentFormatRow = document.getElementsByClassName(selector)[0];
    const addGeneratorButton = DescriptionGeneratorButton();

    commentFormatRow.insertBefore(addGeneratorButton, commentFormatRow.firstChild);
};

export default injectDescriptionGeneratorButton;
