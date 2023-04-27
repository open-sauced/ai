import { useEffect, useState } from "react";
import { OPEN_SAUCED_AUTH_TOKEN_KEY, OPEN_SAUCED_SESSION_ENDPOINT } from "../constants";
import { cachedFetch } from "../utils/cache";

const removeTokenFromStorage = async () => new Promise(resolve => {
  chrome.storage.sync.remove(OPEN_SAUCED_AUTH_TOKEN_KEY, () => {
    resolve(true);
  });
});

export const useAuth = () => {
  const [authToken, setAuthToken] = useState<null | string>(null);
  const [user, setUser] = useState<null | { id: string, user_name: string }>(null);
  const [isTokenValid, setIsTokenValid] = useState<boolean|null>(null);

  useEffect(() => {
    chrome.storage.sync.get([OPEN_SAUCED_AUTH_TOKEN_KEY], async result => {
      if (result[OPEN_SAUCED_AUTH_TOKEN_KEY]) {
        setAuthToken(result[OPEN_SAUCED_AUTH_TOKEN_KEY]);

        const resp = await cachedFetch(OPEN_SAUCED_SESSION_ENDPOINT, {
          expireInSeconds: 2 * 60 * 60,
          headers: {
            Authorization: `Bearer ${result[OPEN_SAUCED_AUTH_TOKEN_KEY]}`,
            Accept: "application/json",
          },
        });

        if (!resp.ok) {
          removeTokenFromStorage().then(() => {
            setAuthToken(null);
            setUser(null);
            setIsTokenValid(false);
            return null;
          })
            .catch(console.error);
        } else {
          const json = await resp.json();

          setUser(json);
          setIsTokenValid(true);
        }
      } else {
        setIsTokenValid(false);
      }
    });
  }, []);

  return { authToken, user, isTokenValid };
};
