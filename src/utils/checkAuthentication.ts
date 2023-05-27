import {
    OPEN_SAUCED_AUTH_TOKEN_KEY,
    OPEN_SAUCED_OPTED_LOG_OUT_KEY,
    SUPABASE_AUTH_COOKIE_NAME,
    OPEN_SAUCED_INSIGHTS_DOMAIN,
    SUPABASE_LOGIN_URL,
} from "../constants";
import { checkTokenValidity } from "./fetchOpenSaucedApiData";
import setAccessTokenInChromeStorage from "../utils/setAccessToken";

export const checkAuthentication = async () => {
    if (await hasOptedLogOut()) {
        return chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);
    }

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

export const isLoggedIn = async (): Promise<boolean> => Object.entries(await chrome.storage.sync.get(OPEN_SAUCED_AUTH_TOKEN_KEY)).length !== 0;

export const getAuthToken = async (): Promise<string> => (await chrome.storage.sync.get(OPEN_SAUCED_AUTH_TOKEN_KEY))[OPEN_SAUCED_AUTH_TOKEN_KEY];

export const optLogOut = () => {
    void chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);
    void chrome.storage.local.set({ [OPEN_SAUCED_OPTED_LOG_OUT_KEY]: true });
};

export const optLogIn = () => {
    if (typeof window === "undefined") {
        return;
    }
    void chrome.storage.local.set({ [OPEN_SAUCED_OPTED_LOG_OUT_KEY]: false });
    window.open(SUPABASE_LOGIN_URL, "_blank");
};

const hasOptedLogOut = async (): Promise<boolean> => (await chrome.storage.local.get(OPEN_SAUCED_OPTED_LOG_OUT_KEY))[OPEN_SAUCED_OPTED_LOG_OUT_KEY] === true;

