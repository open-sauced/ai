import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/open-sauced-orange-bg-logo.svg";

export const ChatDialog = (ownerName: string, repoName: string) => {
    const chatDialog = createHtmlElement("div", {
        id: "chat-dialog",
        innerHTML: `
            <img id="chat-dialog-button-logo" class="w-14 h-14 rounded-full fixed bottom-0 right-0 m-8 z-50 cursor-pointer"
                src=${chrome.runtime.getURL(openSaucedLogoIcon)}
            />
        `,
        onclick: () => handleChatDialogClick(ownerName, repoName),
    });

    return chatDialog;
};

const handleChatDialogClick = (ownerName: string, repoName: string) => {
    console.log("chat dialog clicked", ownerName, repoName);
};
