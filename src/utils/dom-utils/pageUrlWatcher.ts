export const pageUrlWatch = (callback: () => void, delayInMs = 0) => {
    let previousUrl = location.href;
    const observer = new MutationObserver((mutationList: MutationRecord[], observer: MutationObserver) => {
        if (location.href !== previousUrl) {
            previousUrl = location.href;
            setTimeout(callback, delayInMs);
            observer.disconnect();
        }
    });

    observer.observe(document.body, { attributes: true, subtree: true });
};
