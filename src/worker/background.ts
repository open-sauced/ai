import { LINKEDIN_PROJECT_FORM_SELECTOR } from "../constants";
import { Message, MessageType } from "../ts/types";
import { setDefaultDescriptionConfig } from "../utils/ai-utils/descriptionconfig";
import { getRepoAPIURL } from "../utils/urlMatchers";

chrome.runtime.onInstalled.addListener(setDefaultDescriptionConfig);

chrome.runtime.onMessage.addListener(async (message: Message) => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (message.type === MessageType.LinkedInProject) {
        const response = await fetch(getRepoAPIURL(message.data.url));
        const data = await response.json();
        const tab = await chrome.tabs.create({
            url: "https://www.linkedin.com/in/me/edit/forms/project/new/",
            active: true,
        });

        void chrome.scripting.executeScript({
            target: { tabId: tab.id! },
            func: (data, selector) => {
                const populateDataToLinkedIn = (data: any) => {
                    const inputFields: NodeListOf<HTMLInputElement> =
                        document.querySelectorAll(selector);

                    if (inputFields.length === 0) {
                        // Set timeout to wait for the page to load
                        setTimeout(() => {
                            populateDataToLinkedIn(data);
                        }, 500);

                        return;
                    }
                    inputFields[0].value = data.name;
                    inputFields[1].value = data.description;
                };

                populateDataToLinkedIn(data);
            },
            args: [data, LINKEDIN_PROJECT_FORM_SELECTOR],
        });
    }
});
