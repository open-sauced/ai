export const cachedFetch = async (
    url: string,
    options:
        | number
        | (RequestInit & { expireInSeconds?: number; forceRefresh?: boolean })
        | undefined,
) => {
    let expiry = 5 * 60;

    if (typeof options === "number") {
        expiry = options;
        options = undefined;
    } else if (typeof options === "object") {
        expiry = options.expireInSeconds ?? expiry;
    }

    const cacheKey = url;
    const cached = (await chrome.storage.local.get(cacheKey))[cacheKey];
    const whenCached = (await chrome.storage.local.get(`${cacheKey}:ts`))[
        `${cacheKey}:ts`
    ];

    if (cached && whenCached !== null && !options?.forceRefresh) {
        const age = (Date.now() - parseInt(whenCached)) / 1000;

        if (age < expiry) {
            const response = new Response(new Blob([cached]));

            return Promise.resolve(response);
        }
        void chrome.storage.local.remove(cacheKey);
        void chrome.storage.local.remove(`${cacheKey}:ts`);
    }

    return fetch(url, options)
        .then(async (response) => {
            if (response.status === 200) {
                const ct = response.headers.get("Content-Type");

                if (ct?.match(/(application\/json|text\/.*)/i)) {
                    const content = await response.clone().text();

                    void chrome.storage.local.set({ [cacheKey]: content });
                    void chrome.storage.local.set({
                        [`${cacheKey}:ts`]: Date.now(),
                    });
                }
            }
            return response;
        })
        .catch(console.error);
};
