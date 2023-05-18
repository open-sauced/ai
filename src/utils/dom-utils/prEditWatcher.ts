const prEditWatch = (callback: () => void, delayInMs = 0) => {
    const observer = new MutationObserver((mutationList: MutationRecord[], observer: MutationObserver) => {
        for (const mutation of mutationList) {
            if (Array.from((mutation.target as HTMLElement).classList).includes("is-comment-editing")) {
                setTimeout(callback, delayInMs);
                observer.disconnect();
            }
        }
    });

    observer.observe(document.body, { attributes: true, subtree: true });
};

export default prEditWatch;
