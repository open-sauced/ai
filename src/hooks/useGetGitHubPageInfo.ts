import { useEffect, useState } from "react";
import { isGithubPullRequestPage, isGithubRepoPage } from "../utils/urlMatchers";

interface GitHubPageInfo {
    prUrl: string;
    prTitle: string;
    type: "unknown" | "PR" | "REPO";
}

export const usGetGitHubPageInfo = () => {
    const [GithubPRPage, setGithubPRPage] = useState<GitHubPageInfo>({ prUrl: "", prTitle: "", type: "unknown"});

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs.length > 0) {
                const tab = tabs[0];

                if (isGithubPullRequestPage(tab.url!)) {
                    setGithubPRPage({ prUrl: tab.url!, prTitle: tab.title!.split("by")[0].trim(), type: "PR" });
                } else if (isGithubRepoPage(tab.url!)) {
                    setGithubPRPage({ prUrl: tab.url!, prTitle: "", type: "REPO" });
                }
            }
        });
    }, []);


    return GithubPRPage;
};
