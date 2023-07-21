import { createHtmlElement } from "../../../utils/createHtmlElement";
import openSaucedLogoIcon from "../../../assets/open-sauced-orange-bg-logo.svg";

export const ChatDialog = (ownerName: string, repoName: string) => {
    const chatDialog = createHtmlElement("div", {
        id: "chat-dialog-circle",
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
    // open chat dialog rounded rectangle white background with shadow
    const chatDialog = createHtmlElement("div", {
        id: "chat-dialog",
        className: "fixed bottom-20 right-0 m-8 z-50",
        innerHTML: `
            <div id="chat-dialog-header" class="flex flex-row justify-between items-center w-96 h-16 rounded-tl-xl rounded-tr-lg bg-slate-800 shadow-lg">
                <div id="chat-dialog-header-left" class="flex flex-row justify-between w-full pr-4 items-center">
                    <div id="chat-dialog-header-left-logo-container" class="flex flex-row items-center">
                        <img id="chat-dialog-header-left-logo" class="w-12 h-12 rounded-full ml-4" src=${chrome.runtime.getURL(openSaucedLogoIcon)} />
                        <div id="chat-dialog-header-left-text" class="ml-4">
                            <div id="chat-dialog-header-left-text-title" class="text-lg font-bold text-white">OpenSauced</div>
                            <div id="chat-dialog-header-left-text-subtitle" class="text-sm text-gray-400">Ask queries about ${ownerName}/${repoName}</div>
                        </div>
                    </div>
                    <div id="chat-dialog-header-left-close" class="w-8 h-8 rounded-full bg-gray-200 flex flex-row justify-center items-center ml-4 cursor-pointer">
                        <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 18L18 6M6 6l12 12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </div>
                </div>
            </div>
            <div id="chat-dialog-body" class="flex flex-col w-96 h-96 rounded-bl-xl rounded-br-lg bg-white shadow-lg">
                <div id="chat-dialog-body-start-conversation" class="flex flex-col justify-center items-center w-full h-full">
                <div class="text-2xl font-bold text-slate-700">RepoQuery</div>
                <p class="text-sm text-gray-500 w-5/6 text-center mt-4">With RepoQuery, you can ask questions about ${ownerName}/${repoName} and get answers with the help of AI.<br/>For RepoQuery to work on a repository, it needs to be indexed by
                us first. Click below to check if this repository is indexed and start the conversation!</p>
                <button
                    class="bg-orange no-underline border-none rounded-md text-white font-bold py-2 px-4 mt-4 cursor-pointer
                    bg-gradient-to-r from-[#e67e22] to-[#d35400]"
                >
                    Start the conversation
                </button>
                </div>
            </div>
            `,
    });

    if (document.getElementById("chat-dialog")) {
        document.getElementById("chat-dialog")?.remove();
    } else {
        document.body.appendChild(chatDialog);

        document.getElementById("chat-dialog-header-left-close")?.addEventListener("click", () => {
            document.getElementById("chat-dialog")?.remove();
        });
    }
};
