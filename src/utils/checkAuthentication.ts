import {
  OPEN_SAUCED_AUTH_TOKEN_KEY,
  SUPABASE_AUTH_COOKIE_NAME,
  OPEN_SAUCED_INSIGHTS_DOMAIN,
} from "../constants";
import { checkTokenValidity } from "../utils/fetchOpenSaucedApiData";
import setAccessTokenInChromeStorage from "../utils/setAccessToken";

export const checkAuthentication = () => {
  try {
    chrome.cookies.get(
      {
        name: SUPABASE_AUTH_COOKIE_NAME,
        url: `https://${OPEN_SAUCED_INSIGHTS_DOMAIN}`,
      },
      async (cookie) => {
        if (!cookie) {
          return chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);
        }
        const authCookie = JSON.parse(decodeURIComponent(cookie.value))[0];
        const isValidToken = await checkTokenValidity(authCookie);

        if (!isValidToken) {
          return chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);
        }
        void setAccessTokenInChromeStorage(authCookie);
      }
    );
  } catch (error) {
    console.error("Error processing cookie:", error);
  }
};
