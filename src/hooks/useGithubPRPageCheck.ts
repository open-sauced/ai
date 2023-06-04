import { useEffect, useState } from "react";
import { isGithubPullRequestPage } from "../utils/urlMatchers";

interface GithubPRPageCheck {
    isGithubPRPage: boolean;
    prUrl: string;
    prTitle: string;
}

export const useIsGithubPRPageCheck = () => {
    const [GithubPRPage, setGithubPRPage] = useState<GithubPRPageCheck>({ isGithubPRPage: false, prUrl: "", prTitle: "" });

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs.length > 0) {
                const tab = tabs[0];

                if (isGithubPullRequestPage(tab.url!)) {
                    setGithubPRPage({ isGithubPRPage: true, prUrl: tab.url!, prTitle: tab.title!.split("by")[0].trim() });
                }
            }
        });
    }, []);


    return GithubPRPage;
};
