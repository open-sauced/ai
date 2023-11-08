import { DescriptionGeneratorButton } from "../../content-scripts/components/GenerateAIDescription/DescriptionGeneratorButton";
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

    const prActionsClassName = "ActionBar-item-container";
    const actionBars = document.getElementsByClassName(prActionsClassName);
    const actionBarsArray = Array.from(actionBars);
    const addGeneratorButton = DescriptionGeneratorButton();
    const firstPrDescription = actionBarsArray[0];

    if (!firstPrDescription.querySelector("#ai-description-button")) {
        firstPrDescription.insertBefore(addGeneratorButton, firstPrDescription.firstChild);
    }
};

export default injectDescriptionGeneratorButton;
