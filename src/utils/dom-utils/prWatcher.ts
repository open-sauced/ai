import domUpdateWatch from "./domUpdateWatcher";

const prEditWatch = (callback: () => void, delayInMs = 0) => {
    const observer = new MutationObserver((mutationList: MutationRecord[], observer: MutationObserver) => {
        mutationList.forEach(mutation => {
            if (Array.from((mutation.target as HTMLElement).classList).includes("is-comment-editing")) {
                setTimeout(callback, delayInMs);
                observer.disconnect();
            }
        });
    });

    // Disconnect the observer when the user navigates to a new page
    domUpdateWatch(() => {
        observer.disconnect();
    });

    observer.observe(document.body, { attributes: true, subtree: true });
};

export const prReviewWatch = (callback: (node: HTMLElement) => void, delayInMs = 0) => {
    const githubCommentSelector = "inline-comment-form-container";
    const observer = new MutationObserver((mutationList: MutationRecord[]) => {
        mutationList.forEach(mutation => {
            if (Array.from((mutation.target as HTMLElement).classList).includes(githubCommentSelector)) {
                setTimeout(() => {
                    const commentNodes = document.getElementsByClassName(githubCommentSelector);

                    Array.from(commentNodes).forEach(node => {
                        callback(node as HTMLElement);
                    });
                }, delayInMs);
            }
        });
    });

    observer.observe(document.body, { attributes: true, subtree: true, childList: true });
};

export default prEditWatch;
