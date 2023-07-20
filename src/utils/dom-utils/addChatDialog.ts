import { ChatDialog } from "../../content-scripts/components/ChatDialog/ChatDialog";
import { isLoggedIn } from "../checkAuthentication";
import { isPublicRepository } from "../fetchGithubAPIData";

const injectChatDialog = async (ownerName: string, repoName: string) => {
    const chatDialog = ChatDialog(ownerName, repoName);

    if (document.getElementById("chat-dialog") || !(await isLoggedIn()) || !(await isPublicRepository(window.location.href))) {
        return;
    }

    document.body.appendChild(chatDialog);
};

export default injectChatDialog;
