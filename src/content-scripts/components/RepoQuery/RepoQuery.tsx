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

    ReactDOM.createRoot(repoQueryRoot).render(
        <React.StrictMode>
            <RepoQuery
                ownerName={ownerName}
                repoName={repoName}
            />
        </React.StrictMode>,
    );


    return repoQueryRoot;
};

