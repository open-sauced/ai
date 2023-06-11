import { AICodeReviewButton } from "../../content-scripts/components/AICodeReview/AICodeReviewButton";
import { GITHUB_REVIEW_SUGGESTION_SELECTOR } from "../../constants";
import { isPublicRepository } from "../fetchGithubAPIData";
import { SettingsConfig } from "../../popup/pages/settings";

const injectChangeSuggestorButton = async (commentNode: HTMLElement) => {
    if (!(await isPublicRepository(window.location.href))) {
        return;
    }

    const settingsConfig = await new Promise(resolve => {
        chrome.storage.sync.get("osSettingsConfig", result => {
            resolve(result.osSettingsConfig);
        });
    });

    if (settingsConfig) {
        const { codeRefactor } = settingsConfig as SettingsConfig;

        if (!codeRefactor) {
            return;
        }
    }

    const suggestChangesIcon = commentNode.getElementsByClassName(GITHUB_REVIEW_SUGGESTION_SELECTOR)[0];
    const changeSuggestorButton = AICodeReviewButton(commentNode);

    if (suggestChangesIcon.querySelector("#os-ai-change-gen")) {
        return;
    }
    suggestChangesIcon.insertBefore(changeSuggestorButton, suggestChangesIcon.firstChild);
};

export default injectChangeSuggestorButton;
