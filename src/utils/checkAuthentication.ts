import {
    OPEN_SAUCED_AUTH_TOKEN_KEY,
    OPEN_SAUCED_INSIGHTS_DOMAIN,
    OPEN_SAUCED_OPTED_LOG_OUT_KEY, SUPABASE_LOGIN_URL, SUPABASE_PKCE_VERIFIER_COOKIE_NAME,
} from "../constants";

export const isLoggedIn = async (): Promise<boolean> => Object.entries(await chrome.storage.sync.get(OPEN_SAUCED_AUTH_TOKEN_KEY)).length !== 0;

export const getAuthToken = async (): Promise<string> => (await chrome.storage.sync.get(OPEN_SAUCED_AUTH_TOKEN_KEY))[OPEN_SAUCED_AUTH_TOKEN_KEY];

export const optLogOut = () => {
    void removeAuthTokenFromStorage();
    void chrome.storage.local.set({ [OPEN_SAUCED_OPTED_LOG_OUT_KEY]: true });
};

export const optLogIn = async () => {
    if (typeof window === "undefined") {
        return;
    }
    void chrome.storage.local.set({ [OPEN_SAUCED_OPTED_LOG_OUT_KEY]: false });

    const verifier = generatePKCEVerifier();
    const challenge = await generatePKCEChallenge(verifier);

    const loginURL = new URL(SUPABASE_LOGIN_URL);

    loginURL.searchParams.append("provider", "github");
    loginURL.searchParams.append(
        "redirect_to",
        `https://${OPEN_SAUCED_INSIGHTS_DOMAIN}`,
    );
    loginURL.searchParams.append("code_challenge_method", "s256");
    loginURL.searchParams.append("code_challenge", challenge);

    await chrome.cookies.set({
        url: `https://${OPEN_SAUCED_INSIGHTS_DOMAIN}`,
        name: SUPABASE_PKCE_VERIFIER_COOKIE_NAME,
        value: verifier,
    });
    window.open(loginURL, "_blank");
};

export const hasOptedLogOut = async (): Promise<boolean> => (await chrome.storage.local.get(OPEN_SAUCED_OPTED_LOG_OUT_KEY))[OPEN_SAUCED_OPTED_LOG_OUT_KEY] === true;

export const removeAuthTokenFromStorage = async (): Promise<void> => chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY);

// Custom browser only PKCE implementation based on https://github.com/supabase/gotrue-js

const dec2hex = (dec: number) => (`0${dec.toString(16)}`).substring(-2);

const generatePKCEVerifier = () => {
    const verifierLength = 56;
    const array = new Uint32Array(verifierLength);

    crypto.getRandomValues(array);
    return Array.from(array, dec2hex).join("");
};

const sha256 = async (randomString: string) => {
    const encoder = (new TextEncoder);
    const encodedData = encoder.encode(randomString);
    const hash = await window.crypto.subtle.digest("SHA-256", encodedData);
    const bytes = new Uint8Array(hash);

    return Array.from(bytes)
        .map(c => String.fromCharCode(c))
        .join("");
};

const base64urlencode = (str: string) => btoa(str).replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/[=]+$/, "");

const generatePKCEChallenge = async (verifier: string) => {
    const hashed = await sha256(verifier);

    return base64urlencode(hashed);
};
