import { SUPABASE_LOGOUT_URL, OPEN_SAUCED_AUTH_TOKEN_KEY } from "../constants";

chrome.webRequest.onCompleted.addListener(
  (details) => {
    chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);
  },
  { urls: [SUPABASE_LOGOUT_URL] }
);

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo) {
  if (changeInfo.url?.includes("github.com")) {
    chrome.tabs.sendMessage(tabId, { message: "GITHUB_URL_CHANGED" });
  }
});
