export const cachedFetch = async (
  url: string,
  options:
    | number
    | (RequestInit & { expireInSeconds: number; forceRefresh?: boolean })
    | undefined,
) => {
  let expiry = 5 * 60; // 5 min default

  if (typeof options === "number") {
    expiry = options;
    options = undefined;
  } else if (typeof options === "object") {
    expiry = options.expireInSeconds ?? expiry;
  }

  const cacheKey = url;
  const cached = (await chrome.storage.local.get(cacheKey))[cacheKey];
  const whenCached = (await chrome.storage.local.get(`${cacheKey}:ts`))[`${cacheKey}:ts`];

  if (cached && whenCached !== null && !options?.forceRefresh) {
    const age = (Date.now() - parseInt(whenCached)) / 1000;

    if (age < expiry) {
      const response = new Response(new Blob([cached]));

      return Promise.resolve(response);
    }
      chrome.storage.local.remove(cacheKey);
      chrome.storage.local.remove(`${cacheKey}:ts`);
  }

  return fetch(url, options).then(response => {
    if (response.status === 200) {
      const ct = response.headers.get("Content-Type");

      if (ct && ct.match(/(application\/json|text\/.*)/i)) {
        response
          .clone()
          .text()
          .then(content => {
            chrome.storage.local.set({ [cacheKey]: content });
            chrome.storage.local.set({ [`${cacheKey}:ts`]: Date.now() });
          });
      }
    }
    return response;
  });
};
