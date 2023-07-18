import {
    OPEN_SAUCED_AUTH_TOKEN_KEY,
    OPEN_SAUCED_OPTED_LOG_OUT_KEY, SUPABASE_LOGIN_URL,
} from "../constants";


export const isLoggedIn = async (): Promise<boolean> => Object.entries(await chrome.storage.sync.get(OPEN_SAUCED_AUTH_TOKEN_KEY)).length !== 0;

export const getAuthToken = async (): Promise<string> => (await chrome.storage.sync.get(OPEN_SAUCED_AUTH_TOKEN_KEY))[OPEN_SAUCED_AUTH_TOKEN_KEY];

export const optLogOut = () => {
    void removeAuthTokenFromStorage();
    void chrome.storage.local.set({ [OPEN_SAUCED_OPTED_LOG_OUT_KEY]: true });
};

export const optLogIn = () => {
    if (typeof window === "undefined") {
        return;
    }
    void chrome.storage.local.set({ [OPEN_SAUCED_OPTED_LOG_OUT_KEY]: false });
    window.open(SUPABASE_LOGIN_URL, "_blank");
};

export const hasOptedLogOut = async (): Promise<boolean> => (await chrome.storage.local.get(OPEN_SAUCED_OPTED_LOG_OUT_KEY))[OPEN_SAUCED_OPTED_LOG_OUT_KEY] === true;

export const removeAuthTokenFromStorage = async (): Promise<void> => chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);
