import { useEffect, useState } from "react";
import { RepoQueryPages } from "../components/Dialog";

interface ChatMessage {
    message: string;
    isUser: boolean;
}

export const Chat = ({ ownerName, repoName, setCurrentPage }: { ownerName: string, repoName: string, setCurrentPage: (page: RepoQueryPages) => void }) => {
    // chat ui with bubbles and input
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);

    useEffect(() => {
        setChatHistory([
            {
                message: "Hi, I'm OpenSauced's bot. I can answer your questions about this repository.",
                isUser: false,
            },
            {
                message: "What is OpenSauced?",
                isUser: true,
            },
            {
                message: "OpenSauced is a browser extension that helps you find open source issues to work on.",
                isUser: false,
            },
            {
                message: "How do I use OpenSauced?",
                isUser: true,
            },
            {
                message: "OpenSauced is a browser extension that helps you find open source issues to work on.",
                isUser: false,
            },

        ]);
    }, []);

    return (

        // start with a 90% height empty container which will be populated by chatbubbles and 10% for input
        <div
            className="flex flex-col justify-between items-center w-full h-full"
            id="chat-dialog-body"
        >
            <div
                className="flex flex-col justify-start items-center w-full h-5/6 overflow-y-scroll"
                id="chat-dialog-body-chat-history"
            >
                {chatHistory.map((chatMessage, index) => (
                    <div
                        key={index}
                        className={`flex flex-col justify-start items-start h-auto p-4 rounded-xl m-2 inline-block max-w-xs ${chatMessage.isUser ? "bg-slate-800 self-end" : "bg-slate-700 self-start"}`}
                        id="chat-dialog-body-chat-history-chat-bubble"
                    >
                        <div
                            className={`text-sm text-gray-400 w-full ${chatMessage.isUser ? "text-right" : "text-left"}`}
                            id="chat-dialog-body-chat-history-chat-bubble-message"
                        >
                            {chatMessage.message}
                        </div>
                    </div>
                ))}
            </div>

            <div
                className="flex flex-row justify-between items-center w-full h-1/6"
                id="chat-dialog-body-input"
            >
                <input
                    className="w-5/6 h-10 rounded-xl bg-slate-700 text-white text-sm px-4"
                    id="chat-dialog-body-input-text"
                    placeholder="Ask a question"
                />

                <button
                    className="w-1/6 h-10 rounded-xl bg-orange text-white text-sm"
                    id="chat-dialog-body-input-submit"
                >
                    Send
                </button>

            </div>
        </div>
    );
};
