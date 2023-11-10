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

    const firstPrDescription = document.querySelectorAll(".ActionBar-item-container");

    firstPrDescription.forEach((item, index) => {
        if (!item.querySelector(`#ai-description-button-${index}`)) {
            const addGeneratorButton = DescriptionGeneratorButton(index);

            item.insertBefore(addGeneratorButton, item.firstChild);
        }
    });
};

export default injectDescriptionGeneratorButton;
