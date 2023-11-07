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
    const firstChild = actionBarsArray[0].firstChild;
    if (!actionBarsArray[0].querySelector("#ai-description-button")) {
        actionBarsArray[0].insertBefore(addGeneratorButton, actionBar.firstChild);

    }

    actionBarsArray.forEach(actionBar => {
        if (!actionBar.querySelector("#ai-description-button")) {
            actionBar.insertBefore(addGeneratorButton, actionBar.firstChild);
        }
    });
};

export default injectDescriptionGeneratorButton;
