import { GITHUB_REVIEW_SUGGESTION_CLASS } from "../../constants";
import { isPublicRepository } from "../fetchGithubAPIData";
import { SettingsConfig } from "../../popup/pages/settings";

const injectChangeSuggestorButton = async (commentNode: HTMLElement) => {
    if (!(await isPublicRepository(window.location.href))) {
        return;
    }

    const settingsConfig = await new Promise((resolve) => {
        chrome.storage.sync.get("osSettingsConfig", (result) => {
            resolve(result.osSettingsConfig);
        });
    });

    if (settingsConfig) {
        const { codeRefactor } = settingsConfig as SettingsConfig;

        if (!codeRefactor) {
            return;
        }
    }
};

export default injectChangeSuggestorButton;
