import { useEffect, useState } from "react";
import { isGithubPullRequestPage } from "../utils/urlMatchers";

export const useIsGithubPRPageCheck = () => {
    const [isGithubPRPage, setIsGithubPRPage] = useState(false);

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs.length > 0) {
                const tab = tabs[0];

                setIsGithubPRPage(isGithubPullRequestPage(tab.url!));
            }
        });
    }, []);


    return isGithubPRPage;
};
