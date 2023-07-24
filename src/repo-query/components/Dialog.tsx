import { useState } from "react";
import openSaucedLogoIcon from "../../assets/open-sauced-orange-bg-logo.svg";
import { Home } from "../pages/home";
import { IndexingPage } from "../pages/indexing";

// pages enum
export enum RepoQueryPages {
    Home = "home",
    Indexing = "indexing",
    Chat = "chat",
}

export const Dialog = ({ isOpen, toggleDialog, ownerName, repoName }: { isOpen: boolean, toggleDialog: () => void, ownerName: string, repoName: string }) => {
    const [currentPage, setCurrentPage] = useState(RepoQueryPages.Home);

    return (
        <div
            className="fixed bottom-20 right-0 m-8 z-50"
            id="chat-dialog"
            style={{ display: isOpen ? "block" : "none" }}
        >
            <div
                className="flex flex-row justify-between items-center w-96 h-16 rounded-tl-xl rounded-tr-lg bg-slate-800 shadow-lg"
                id="chat-dialog-header"
            >
                <div
                    className="flex flex-row justify-between w-full pr-4 items-center"
                    id="chat-dialog-header-left"
                >
                    <div
                        className="flex flex-row items-center"
                        id="chat-dialog-header-left-logo-container"
                    >
                        <img
                            alt="OpenSauced logo"
                            className="w-12 h-12 rounded-full ml-4"
                            id="chat-dialog-header-left-logo"
                            src={`${chrome.runtime.getURL(openSaucedLogoIcon)}`}
                        />

                        <div
                            className="ml-4"
                            id="chat-dialog-header-left-text"
                        >
                            <div
                                className="text-lg font-bold text-white"
                                id="chat-dialog-header-left-text-title"
                            >
OpenSauced
                            </div>

                            <div
                                className="text-sm text-gray-400"
                                id="chat-dialog-header-left-text-subtitle"
                            >
Ask queries about
                                {" "}

                                {ownerName}
/

                                {repoName}
                            </div>
                        </div>
                    </div>

                    <div
                        className="w-8 h-8 rounded-full bg-gray-200 flex flex-row justify-center items-center ml-4 cursor-pointer"
                        id="chat-dialog-header-left-close"
                        role="button"
                        tabIndex={0}
                        onClick={toggleDialog}
                        onKeyDown={
                            e => {
                                if (e.key === "Enter") {
                                    toggleDialog();
                                }
                            }
                        }
                    >
                        <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6 18L18 6M6 6l12 12"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            <div
                className="flex flex-col w-96 h-96 rounded-bl-xl rounded-br-lg bg-white shadow-lg"
                id="chat-dialog-body"
            >
                {
                    currentPage === RepoQueryPages.Home
                        ? (
                            <Home
                                ownerName={ownerName}
                                repoName={repoName}
                                setCurrentPage={setCurrentPage}
                            />
                        )
                        : currentPage === RepoQueryPages.Indexing
                            ? (
                                <IndexingPage
                                    ownerName={ownerName}
                                    repoName={repoName}
                                    setCurrentPage={setCurrentPage}
                                />
                            )
                            : null
                }
            </div>
        </div>
    );
};
