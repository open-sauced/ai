import { checkAuthentication } from "../utils/checkAuthentication";
import { SUPABASE_AUTH_COOKIE_NAME, OPEN_SAUCED_INSIGHTS_DOMAIN } from "../constants";

chrome.cookies.onChanged.addListener(changeInfo => {
    if (
      changeInfo.cookie.name === SUPABASE_AUTH_COOKIE_NAME ||
      changeInfo.cookie.domain === OPEN_SAUCED_INSIGHTS_DOMAIN
    ) {
      checkAuthentication();
    }
});

chrome.runtime.onInstalled.addListener(checkAuthentication);
chrome.runtime.onStartup.addListener(checkAuthentication);
