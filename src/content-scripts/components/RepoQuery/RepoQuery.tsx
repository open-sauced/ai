import React from "react";
import ReactDOM from "react-dom/client";
import { RepoQuery } from "../../../repo-query/pages/main";
import { createHtmlElement } from "../../../utils/createHtmlElement";

export const RepoQueryRoot = (ownerName: string, repoName: string) => {
    const repoQueryRoot = createHtmlElement("div", {
        id: "repo-query-root",
        innerHTML: `
            <div>
            </div>
        `,
    });

    if (document.getElementById("repo-query-root")) {
        document.getElementById("repo-query-root")?.remove();
    } else {
        document.body.appendChild(repoQueryRoot);
        ReactDOM.createRoot(document.getElementById("repo-query-root")!).render(
            <React.StrictMode>
                <RepoQuery
                    ownerName={ownerName}
                    repoName={repoName}
                />
            </React.StrictMode>,

        );
    }

    return repoQueryRoot;
};

