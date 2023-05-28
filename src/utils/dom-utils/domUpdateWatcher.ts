const domUpdateWatch = (callback: () => void, delayInMs = 0) => {
    const oldLocation = document.location.href;
    const observer = new MutationObserver(
        (_: unknown, observer: MutationObserver) => {
            const newLocation = document.location.href;

            if (oldLocation === newLocation || document.readyState !== "complete") {
                return;
            }
            observer.disconnect();
            setTimeout(callback, delayInMs);
        },
    );

    observer.observe(document.body, {
        childList: true,
        subtree: true,
    });
};

export default domUpdateWatch;
