import { OPEN_SAUCED_AUTH_TOKEN_KEY } from "../constants";

const setAccessTokenInChromeStorage = async (accessToken: string): Promise<void> => new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [OPEN_SAUCED_AUTH_TOKEN_KEY]: accessToken }, () => {
        if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
        } else {
            resolve();
        }
    });
});

export default setAccessTokenInChromeStorage;

