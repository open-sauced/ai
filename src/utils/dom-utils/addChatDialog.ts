import { RepoQueryRoot } from "../../content-scripts/components/RepoQuery/RepoQuery";
import { isLoggedIn } from "../checkAuthentication";
import { isPublicRepository } from "../fetchGithubAPIData";

const injectChatDialog = async (ownerName: string, repoName: string) => {
    const chatDialog = RepoQueryRoot(ownerName, repoName);

    if (document.getElementById("repo-query-root") || !(await isLoggedIn()) || !(await isPublicRepository(window.location.href))) {
        return;
    }

    document.body.appendChild(chatDialog);
};

export default injectChatDialog;
