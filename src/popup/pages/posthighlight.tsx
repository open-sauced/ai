import { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import OpenSaucedLogo from "../../assets/opensauced-logo.svg";
import { useAuth } from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { createHighlight } from "../../utils/fetchOpenSaucedApiData";
import { goBack, goTo } from "react-chrome-extension-router";
import { OPEN_SAUCED_INSIGHTS_DOMAIN } from "../../constants";
import Home from "./home";

const PostOnHighlight = ({
    prUrl,
    prTitle,
}: {
    prUrl: string;
    prTitle: string;
}) => {
    const { authToken, user } = useAuth();
    const [pageURL, setPageURL] = useState("");
    const [highlightTitle, setHighlightTitle] = useState("");
    const [highlightContent, setHighlightContent] = useState("");
    const [isSendButtonEnabled, enableSendButton] = useState(true);

    const postHighlight = () => {
        enableSendButton(false);
        const postHighlightAPI = createHighlight(
            authToken ?? "",
            pageURL,
            highlightTitle,
            highlightContent,
        );

        toast
            .promise(postHighlightAPI, {
                loading: "Loading ...",
                success: (data) => {
                    enableSendButton(true);
                    if (!data.ok) {
                        throw new Error(`Status code ${data.status}`);
                    }
                    goTo(Home, { forceRefresh: true });
                    return (
                        <span>
                            <a
                                href={`https://${OPEN_SAUCED_INSIGHTS_DOMAIN}/user/${user?.user_name}/highlights`}
                                rel="noreferrer"
                                target="_blank"
                            >
                                See the highlight live
                            </a>
                        </span>
                    );
                },
                error: (e) => {
                    enableSendButton(true);
                    return `Uh oh, there was an error! ${e.message}`;
                },
            })
            .catch(console.error);
    };

    useEffect(() => {
        setPageURL(prUrl);
        setHighlightTitle(prTitle);
    }, []);

    return (
        <div className="p-4 bg-slate-800">
            <Toaster />

            <div className="grid grid-cols-1 divide-y divider-y-center-2 min-w-[320px]">
                <header className="flex justify-between">
                    <div className="flex items-center gap-2">
                        <button
                            className="rounded-full p-2 bg-slate-700 hover:bg-slate-700/50"
                            onClick={() => {
                                goBack();
                            }}
                        >
                            <FaChevronLeft className="text-osOrange text-white" />
                        </button>

                        <img
                            alt="OpenSauced logo"
                            className="w-[100%]"
                            src={OpenSaucedLogo}
                        />
                    </div>
                </header>

                <main className="text-white">
                    <input
                        className="p-1.5 rounded-md mb-2 w-full text-black"
                        maxLength={50}
                        placeholder="An amazing title here"
                        type="text"
                        value={highlightTitle}
                        onChange={(e) => setHighlightTitle(e.target.value)}
                    />

                    <textarea
                        className="p-1.5 rounded-md mb-2 w-full text-black"
                        placeholder="Summarize this pull request"
                        rows={5}
                        value={highlightContent}
                        onChange={(e) => setHighlightContent(e.target.value)}
                    />

                    <div className="flex justify-evenly">
                        <button
                            className="inline-block disabled:bg-gray-500 text-black bg-gh-white rounded-md p-2 text-sm font-semibold text-center select-none w-5/12 border hover:shadow-button hover:no-underline"
                            disabled={!isSendButtonEnabled}
                            onClick={postHighlight}
                        >
                            Post
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default PostOnHighlight;
