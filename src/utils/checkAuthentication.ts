import {
    OPEN_SAUCED_AUTH_TOKEN_KEY,
    OPEN_SAUCED_OPTED_LOG_OUT_KEY,
    SUPABASE_AUTH_COOKIE_NAME,
    OPEN_SAUCED_INSIGHTS_DOMAIN,
    SUPABASE_LOGIN_URL,
} from "../constants";

export const checkAuthentication = async (
    hasOptedLogOut: () => Promise<boolean>,
    getCookie: (
        details: chrome.cookies.Details,
        callback: (cookie: chrome.cookies.Cookie | null) => void
    ) => void,
    checkTokenValidity: (authCookie: any) => Promise<boolean>,
    setAccessTokenInChromeStorage: (authCookie: any) => void,
    removeAuthTokenFromStorage: () => void,
    logError: (error: string) => void,
) => {
    if (await hasOptedLogOut()) {
        return removeAuthTokenFromStorage();
    }

    getCookie(
        {
            name: SUPABASE_AUTH_COOKIE_NAME,
            url: `https://${OPEN_SAUCED_INSIGHTS_DOMAIN}`,
        },
        async cookie => {
            if (!cookie) {
                return removeAuthTokenFromStorage();
            }
            try {
                const authCookie = JSON.parse(decodeURIComponent(cookie.value))[0];
                const isValidToken = await checkTokenValidity(authCookie);

                if (!isValidToken) {
                    return removeAuthTokenFromStorage();
                }
                setAccessTokenInChromeStorage(authCookie);
            } catch (error) {
                removeAuthTokenFromStorage();
                logError(error as string);
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

export const hasOptedLogOut = async (): Promise<boolean> => (await chrome.storage.local.get(OPEN_SAUCED_OPTED_LOG_OUT_KEY))[OPEN_SAUCED_OPTED_LOG_OUT_KEY] === true;

export const removeAuthTokenFromStorage = async (): Promise<void> => chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);
