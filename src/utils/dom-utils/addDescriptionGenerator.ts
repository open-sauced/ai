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

    const firstPrDescription = document.querySelector(".ActionBar-item-container");

    if (firstPrDescription && !firstPrDescription.querySelector("#ai-description-button")) {
        const addGeneratorButton = DescriptionGeneratorButton();

        firstPrDescription.insertBefore(addGeneratorButton, firstPrDescription.firstChild);
    }
};

export default injectDescriptionGeneratorButton;
