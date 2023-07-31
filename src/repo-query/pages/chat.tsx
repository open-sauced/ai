import { useEffect, useState } from "react";
import { REPO_QUERY_QUERY_ENDPOINT } from "../../constants";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ChatMessage {
    message: string;
    isUser: boolean;
}

export const Chat = ({ ownerName, repoName }: { ownerName: string, repoName: string }) => {
    // chat ui with bubbles and input
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [sendEnabled, setSendEnabled] = useState(true);
    const [botThinking, setBotThinking] = useState(false);
    const [statusMessage, setStatusMessage] = useState("Thinking...🧠");

    const processChunk = (chunk: string) => {
        const chunkLines = chunk.split("\n");
        const eventLine = chunkLines[0];
        const dataLine = chunkLines[1];

        const event = eventLine.split(": ")[1];
        let data:any;

        try {
            data = JSON.parse(dataLine.split(": ")[1]);
        } catch (e) {
            console.error(dataLine);

            // remove quotes from string
            data = dataLine.split("data: ")[1].substring(1, dataLine.split("data: ")[1].length - 2);
        }


        if (event === "SEARCH_CODEBASE") {
            setStatusMessage("Searching the codebase for your query...🔍");
        } else if (event === "SEARCH_FILE") {
            setStatusMessage(`Searching ${data.path} for your query...🔍`);
        } else if (event === "GENERATE_RESPONSE") {
            setStatusMessage("Generating a response...🧠");
        } else if (event === "SEARCH_PATH") {
            setStatusMessage(`Looking for ${data.path} in the codebase...🔍`);
        } else if (event === "DONE") {
            setBotThinking(false);
            setSendEnabled(true);
            const response = data as string;

            setChatHistory(prevChatHistory => [...prevChatHistory, {
                message: response,
                isUser: false,
            }]);
        } else if (event === "ERROR") {
            setBotThinking(false);
            setSendEnabled(true);
            console.error(data);
            setChatHistory(prevChatHistory => [...prevChatHistory, {
                message: "Something went wrong. Please try again.",
                isUser: false,
            }]);
        }
    };

    const askQuery = async (query: string) => {
        setBotThinking(true);
        setSendEnabled(false);
        const response = await fetch(
            `${REPO_QUERY_QUERY_ENDPOINT}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    query,
                    repository: {
                        owner: ownerName,
                        name: repoName,
                        branch: "HEAD",
                    },
                }),
            },
        );

        const reader = response.body?.getReader();

        if (reader) {
            const decoder = new TextDecoder("utf-8");
            const { done: readerDone } = await reader.read();

            // eslint-disable-next-line no-loops/no-loops
            while (!readerDone) {
                // eslint-disable-next-line no-await-in-loop
                const { value, done } = await reader.read();
                const chunkString = decoder.decode(value);

                if (chunkString.includes("event:")) {
                    processChunk(chunkString);
                }
                if (done) {
                    break;
                }
            }
        }
    };


    useEffect(() => {
        setChatHistory([
            {
                message: `Hi, I'm OpenSauced's bot. I can answer your questions about ${ownerName}/${repoName}.`,
                isUser: false,
            },
        ]);
    }, []);

    const suggestedQuestions = ["What's the tech stack for this project?", "How do I set this up?", "List some functions with side effects."];

    return (

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
                        className="flex flex-col justify-start items-start w-full"
                    >
                        <div
                            key={index}
                            className={`flex flex-col justify-start items-start h-auto p-4 rounded-xl m-2 max-w-xs ${chatMessage.isUser ? "bg-slate-800 self-end" : "bg-slate-700 self-start"}`}
                            id="chat-bubble"
                        >
                            <div
                                className={`text-sm text-gray-300 w-full ${chatMessage.isUser ? "text-right" : "text-left"}`}
                                id="chat-bubble-message"
                            >
                                {/* this might contain markdown if its from the bot*/}
                                {chatMessage.isUser
                                    ? chatMessage.message
                                    : (
                                        <ReactMarkdown components={{
                                            // eslint-disable-next-line @typescript-eslint/no-unused-vars
                                            code ({ node, inline, className, children, ...props }) {
                                                const match = (/language-(\w+)/).exec(className ?? "");

                                                return !inline && match
                                                    ? (
                                                        <SyntaxHighlighter
                                                            PreTag="div"
                                                            language={match[1]}
                                                            {...props}
                                                            style={darcula}
                                                        >
                                                            {String(children).replace(/\n$/, "")}
                                                        </SyntaxHighlighter>
                                                    )
                                                    : (
                                                        <code
                                                            className={className}
                                                            {...props}
                                                        >
                                                            {children}
                                                        </code>
                                                    );
                                            },
                                        }}
                                        >
                                            {chatMessage.message}
                                        </ReactMarkdown>
                                    )}
                            </div>
                        </div>

                        {!chatMessage.isUser &&
                            index === chatHistory.length - 1 &&
                        (

                            <div
                                className="flex flex-col justify-start items-start w-full pl-4"
                                id="chat-dialog-body-chat-history-chat-bubble"
                            >
                                <p
                                    className="text-md text-gray-600 w-full text-left mb-2"
                                    id="chat-dialog-body-chat-history-chat-bubble-message"
                                >
                                    Here&apos;s some example questions you can ask:
                                </p>

                                <div
                                    className="flex flex-col justify-start items-start w-full"
                                    id="question-suggestions"
                                >
                                    {
                                        suggestedQuestions.map((question, index) => (
                                            <button
                                                key={index}
                                                className="h-auto p-2 rounded-xl mb-2 inline-block bg-gradient-to-r from-[#e67e22] to-[#d35400] border-none"
                                                id="question-suggestion"
                                                onClick={
                                                    async () => {
                                                        setChatHistory([...chatHistory, {
                                                            message: question,
                                                            isUser: true,
                                                        }]);

                                                        await askQuery(question);
                                                    }
                                                }
                                            >
                                                <div
                                                    className="text-sm text-white w-full text-left"
                                                    id="question-suggestion-message"
                                                >
                                                    {question}
                                                </div>
                                            </button>
                                        ))
                                    }
                                </div>
                            </div>
                        )}
                    </div>
                ))}

                { botThinking && (
                    <div
                        className="flex flex-row justify-start items-start h-auto p-4 rounded-xl m-2 inline-block max-w-xs bg-slate-700 self-start"
                        id="chat-dialog-body-chat-history-chat-bubble"
                    >
                        <div
                            className="text-sm text-gray-400 w-full text-left"
                            id="chat-dialog-body-chat-history-chat-bubble-message"
                        >
                            <i>
                                {statusMessage}
                            </i>

                            <div className="flex flex-row items-center mt-2">
                                <div className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-bounce" />

                                <div className="w-2 h-2 bg-gray-400 rounded-full mr-1 animate-[bounce_1s_infinite_250ms_reverse]" />

                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-[bounce_1s_infinite_500ms]" />

                            </div>
                        </div>
                    </div>
                ) }
            </div>

            <div
                className="flex flex-row justify-between items-center w-full h-1/6 px-2"
                id="chat-dialog-body-input"
            >
                <input
                    className="w-5/6 h-10 rounded-xl bg-slate-700 text-white text-sm px-4 mr-2 border-none focus:outline-none"
                    id="chat-dialog-body-input-text"
                    placeholder="Ask a question"
                    onKeyDown={
                        async event => {
                            if (sendEnabled && event.key === "Enter") {
                                const input = document.getElementById("chat-dialog-body-input-text") as HTMLInputElement;
                                const query = input.value;

                                if (query) {
                                    setChatHistory([...chatHistory, {
                                        message: query,
                                        isUser: true,
                                    }]);

                                    input.value = "";

                                    await askQuery(query);
                                }
                            }
                        }
                    }
                />

                <button
                    className="w-1/6 h-10 rounded-xl bg-orange text-white text-sm border-none disabled:opacity-50 focus:outline-none disabled:cursor-not-allowed"
                    disabled={!sendEnabled}
                    id="chat-dialog-body-input-submit"
                    onClick={
                        async () => {
                            const input = document.getElementById("chat-dialog-body-input-text") as HTMLInputElement;
                            const query = input.value;

                            if (query) {
                                setChatHistory([...chatHistory, {
                                    message: query,
                                    isUser: true,
                                }]);

                                input.value = "";

                                await askQuery(query);
                            }
                        }
                    }
                >
                    Send
                </button>

            </div>
        </div>
    );
};
