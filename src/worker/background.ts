import { checkAuthentication, hasOptedLogOut, removeAuthTokenFromStorage } from "../utils/checkAuthentication";
import { SUPABASE_AUTH_COOKIE_NAME, OPEN_SAUCED_INSIGHTS_DOMAIN } from "../constants";
import { setDefaultDescriptionConfig } from "../utils/aiprdescription/descriptionconfig";
import { checkTokenValidity } from "../utils/fetchOpenSaucedApiData";
import setAccessTokenInChromeStorage from "../utils/setAccessToken";


const checkUserAuthentication = () => {
    void checkAuthentication(hasOptedLogOut, chrome.cookies.get, checkTokenValidity, setAccessTokenInChromeStorage, removeAuthTokenFromStorage, console.error);
};

chrome.cookies.onChanged.addListener(changeInfo => {
    if (
        changeInfo.cookie.name === SUPABASE_AUTH_COOKIE_NAME ||
      changeInfo.cookie.domain === OPEN_SAUCED_INSIGHTS_DOMAIN
    ) {
        checkUserAuthentication();
    }
});

chrome.runtime.onInstalled.addListener(() => {
    checkUserAuthentication();
});
chrome.runtime.onInstalled.addListener(setDefaultDescriptionConfig);
chrome.runtime.onStartup.addListener(() => {
    checkUserAuthentication();
});
