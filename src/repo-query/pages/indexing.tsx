import { useEffect, useState } from "react";
import { RepoQueryPages } from "../../ts/types";
import {
    REPO_QUERY_COLLECTION_ENDPOINT,
    REPO_QUERY_EMBED_ENDPOINT,
} from "../../constants";

export const IndexingPage = ({
    ownerName,
    repoName,
    setCurrentPage,
}: {
    ownerName: string;
    repoName: string;
    setCurrentPage: (page: RepoQueryPages) => void;
}) => {
    const [statusMessage, setStatusMessage] = useState(
        "We are checking if this repository is indexed. This may take a while.",
    );

    useEffect(() => {
        const processChunk = (chunk: string) => {
            const chunkLines = chunk.split("\n");
            const [eventLine] = chunkLines;

            const event = eventLine.split(": ")[1];

            switch (event) {
                case "FETCH_REPO":
                    setStatusMessage("Fetching Repository from GitHub...");
                    break;
                case "EMBED_REPO":
                    setStatusMessage("Embedding Repository...");
                    break;
                case "SAVE_EMBEDDINGS":
                    setStatusMessage(
                        "Saving the embeddings to our database...",
                    );
                    break;
                case "ERROR":
                    setStatusMessage(
                        "There was an error while indexing this repository. Redirecting to the Home Page.",
                    );
                    setTimeout(() => {
                        setCurrentPage(RepoQueryPages.Home);
                    }, 3000);
                    break;
                case "DONE":
                    setStatusMessage(
                        "Indexing Complete. Redirecting to the Chat Dialog.",
                    );
                    setTimeout(
                        () => {
                            setCurrentPage(RepoQueryPages.Chat);
                        },

                        1000,
                    );
                    break;
                default:
                    break;
            }
        };

        async function checkIndexingStatus() {
            const response = await fetch(
                `${REPO_QUERY_COLLECTION_ENDPOINT}?owner=${ownerName}&name=${repoName}&branch=HEAD`,
            );

            if (response.status !== 200) {
                setStatusMessage(
                    "This repository is not indexed. We are indexing it now. This may take a while.",
                );
                const embedResponse = await fetch(
                    `${REPO_QUERY_EMBED_ENDPOINT}`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            owner: ownerName,
                            name: repoName,
                            branch: "HEAD",
                        }),
                    },
                );

                if (embedResponse.status === 403) {
                    setStatusMessage(
                        "This repository's license does not allow us to index it. Redirecting to the Home Page.",
                    );
                    setTimeout(() => {
                        setCurrentPage(RepoQueryPages.Home);
                    }, 3000);
                    return;
                }

                if (embedResponse.status !== 200) {
                    setStatusMessage(
                        "There was an error while indexing this repository. Redirecting to the Home Page.",
                    );
                    setTimeout(() => {
                        setCurrentPage(RepoQueryPages.Home);
                    }, 3000);
                    return;
                }

                const reader = embedResponse.body?.getReader();

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
            } else {
                setStatusMessage(
                    "This repository is already indexed! Redirecting to the Chat Dialog.",
                );
                setTimeout(() => {
                    setCurrentPage(RepoQueryPages.Chat);
                }, 1000);
            }
        }

        void checkIndexingStatus();
    }, []);

    return (
        <div
            className="flex flex-col justify-center items-center w-full h-full"
            id="chat-dialog-body-loading-spinner"
        >
            <div className="text-2xl font-bold text-slate-700">RepoQuery</div>

            <p className="text-sm text-gray-500 w-5/6 text-center mt-4">
                {statusMessage}
            </p>

            <div className="mt-4">
                <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-orange"
                    fill="none"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />

                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0
                        004 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
            </div>
        </div>
    );
};
