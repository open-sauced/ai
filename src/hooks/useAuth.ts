import { useEffect, useState } from "react";
import {
    OPEN_SAUCED_INSIGHTS_DOMAIN,
    OPEN_SAUCED_SESSION_ENDPOINT,
    SUPABASE_AUTH_COOKIE_NAME,
} from "../constants";
import { cachedFetch } from "../utils/cache";
import {
    hasOptedLogOut,
    removeAuthTokenFromStorage,
} from "../utils/checkAuthentication";
import setAuthTokenInChromeStorage from "../utils/setAccessToken";

export const useAuth = () => {
    const [authToken, setAuthToken] = useState<null | string>(null);
    const [user, setUser] = useState<null | { id: string; user_name: string }>(
        null,
    );
    const [isTokenValid, setIsTokenValid] = useState<boolean>(false);

    useEffect(() => {
        const authenticate = async () => {
            try {
                if (await hasOptedLogOut()) {
                    return;
                }
                const cookie = await chrome.cookies.get({
                    name: SUPABASE_AUTH_COOKIE_NAME,
                    url: `https://${OPEN_SAUCED_INSIGHTS_DOMAIN}`,
                });

                if (!cookie) {
                    return removeAuthTokenFromStorage();
                }
                const token = JSON.parse(decodeURIComponent(cookie.value))[0];

                const response = await cachedFetch(OPEN_SAUCED_SESSION_ENDPOINT, {
                    expireInSeconds: 2 * 60 * 60,
                    headers: {
                        Authorization: `Bearer ${token}`,
                        Accept: "application/json",
                    },
                });

                if (response?.ok) {
                    const json = await response.json();

                    setUser(json);
                    setIsTokenValid(true);
                    setAuthToken(token);
                    void setAuthTokenInChromeStorage(token);
                } else {
                    await removeAuthTokenFromStorage();
                }
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                }
            }
        };

        void authenticate();
    }, []);

    return { authToken, user, isTokenValid };
};
