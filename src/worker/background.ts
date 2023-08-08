import { setDefaultDescriptionConfig } from "../utils/ai-utils/descriptionconfig";

// not sure why the linter/prettier are fighting between two and four spaces here
declare global {
  interface Window {
    browser: typeof chrome;
  }

  // eslint-disable-next-line no-var
  var browser: typeof chrome;
}

browser.runtime.onInstalled.addListener(setDefaultDescriptionConfig);
