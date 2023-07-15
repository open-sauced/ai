import { setDefaultDescriptionConfig } from "../utils/ai-utils/descriptionconfig";

chrome.runtime.onInstalled.addListener(setDefaultDescriptionConfig);
