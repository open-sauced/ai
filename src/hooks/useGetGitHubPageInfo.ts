import { useEffect, useState } from "react";
import { isGithubPullRequestPage, isGithubRepoPage } from "../utils/urlMatchers";

interface GitHubPageInfo {
    pageUrl: string;
    pageTitle: string;
    type: "unknown" | "PR" | "REPO";
}

export const usGetGitHubPageInfo = () => {
    const [GithubPage, setGithubPage] = useState<GitHubPageInfo>({ pageUrl: "", pageTitle: "", type: "unknown" });

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
            if (tabs.length > 0) {
                const tab = tabs[0];

                if (isGithubPullRequestPage(tab.url!)) {
                    setGithubPage({ pageUrl: tab.url!, pageTitle: tab.title!.split("by")[0].trim(), type: "PR" });
                } else if (isGithubRepoPage(tab.url!)) {
                    setGithubPage({ pageUrl: tab.url!, pageTitle: "", type: "REPO" });
                }
            }
        });
    }, []);


    return GithubPage;
};
