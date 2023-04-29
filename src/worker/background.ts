import { SUPABASE_LOGOUT_URL, SUPABASE_AUTH_DOMAIN, SUPABASE_COOKIE_NAME, OPEN_SAUCED_AUTH_TOKEN_KEY } from "../constants";
import { checkTokenValidity } from "../utils/fetchOpenSaucedApiData";
import setAccessTokenInChromeStorage from "../utils/setAccessToken";

chrome.webRequest.onCompleted.addListener(
  details => {
    chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);
  },
  { urls: [SUPABASE_LOGOUT_URL] },
);

chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.url?.includes("github.com")) {
    chrome.tabs.sendMessage(tabId, { message: "GITHUB_URL_CHANGED" });
  }
});

chrome.cookies.onChanged.addListener(async changeInfo => {
  try {
  if (changeInfo.cookie.name != SUPABASE_COOKIE_NAME || changeInfo.cookie.domain != SUPABASE_AUTH_DOMAIN) {
 return;
}
  if (changeInfo.removed) {
 return chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);
}
  const isValidToken = await checkTokenValidity(changeInfo.cookie.value);

  if (!isValidToken) {
 return chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);
}
  setAccessTokenInChromeStorage(changeInfo.cookie.value);
  } catch (error) {
    console.error("Error processing cookie update:", error);
  }
});
