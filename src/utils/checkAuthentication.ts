import {
  OPEN_SAUCED_AUTH_TOKEN_KEY,
  SUPABASE_AUTH_COOKIE_NAME,
  OPEN_SAUCED_INSIGHTS_DOMAIN,
} from "../constants";
import { checkTokenValidity } from "../utils/fetchOpenSaucedApiData";
import setAccessTokenInChromeStorage from "../utils/setAccessToken";

export const checkAuthentication = () => {
    chrome.cookies.get(
      {
        name: SUPABASE_AUTH_COOKIE_NAME,
        url: `https://${OPEN_SAUCED_INSIGHTS_DOMAIN}`,
      },
      async cookie => {
        if (!cookie) {
          return chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);
        }
        try {
        const authCookie = JSON.parse(decodeURIComponent(cookie.value))[0];
        const isValidToken = await checkTokenValidity(authCookie);

        if (!isValidToken) {
          return chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);
        }
        void setAccessTokenInChromeStorage(authCookie);
      } catch (error) {
        void chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);
        console.error("Error processing cookie:", error);
      }
      },
    );
};

export const isLoggedIn = async () =>

  // only a valid auth token can exist in the storage due to the check in line 23
   Object.entries(await chrome.storage.sync.get(OPEN_SAUCED_AUTH_TOKEN_KEY)).length !== 0;

