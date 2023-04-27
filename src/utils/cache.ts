export const cachedFetch = async (
  url: string,
  options:
    | number
    | (RequestInit & { expireInSeconds: number; forceRefresh?: boolean })
    | undefined
) => {
  let expiry = 5 * 60; // 5 min default
  if (typeof options === "number") {
    expiry = options;
    options = undefined;
  } else if (typeof options === "object") {
    expiry = options.expireInSeconds ?? expiry;
  }

  let cacheKey = url;
  let cached = (await chrome.storage.local.get(cacheKey))[cacheKey];
  let whenCached = (await chrome.storage.local.get(cacheKey + ":ts"))[cacheKey + ":ts"];
  
  if (cached && whenCached !== null && !options?.forceRefresh) {
    let age = (Date.now() - parseInt(whenCached)) / 1000;
    if (age < expiry) {
      let response = new Response(new Blob([cached]));
      return Promise.resolve(response);
    } else {
      chrome.storage.local.remove(cacheKey);
      chrome.storage.local.remove(cacheKey + ":ts");
    }
  }

  return fetch(url, options).then((response) => {
    if (response.status === 200) {
      let ct = response.headers.get("Content-Type");
      if (ct && ct.match(/(application\/json|text\/.*)/i)) {
        response
          .clone()
          .text()
          .then((content) => {
            chrome.storage.local.set({ [cacheKey]: content });
            chrome.storage.local.set({ [cacheKey + ":ts"]: Date.now() });
          });
      }
    }
    return response;
  });
};