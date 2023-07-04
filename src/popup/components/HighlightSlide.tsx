import { useEffect, useState } from "react";
import { getHighlightReactions, getUserHighlightReactions, reactOnHighlight, removeReactionOnHighlight } from "../../utils/fetchOpenSaucedApiData";
import { getAuthToken } from "../../utils/checkAuthentication";

interface HighlightSlideProps {
    highlight: {
        id: string;
        url: string;
        title: string;
        login: string;
        highlight: string;
    };
    emojis: Record<string, string>[];
}

export const HighlightSlide = ({ highlight, emojis }: HighlightSlideProps) => {
    const [highlightReactions, setHighlightReactions] = useState<Record<string, any>[]>([]);
    const [reactingDivOpen, setReactingDivOpen] = useState(false);

    async function fetchHighlightReactions () {
        const highlightReactionData = await getHighlightReactions(highlight.id);
        const userHighlightReactionData = await getUserHighlightReactions( await getAuthToken(), highlight.id);

        const highlightReactionsWithEmojiUrls = emojis.filter(emoji => highlightReactionData.some(highlightReaction => highlightReaction.emoji_id === emoji.id)).map(emoji => {
            const highlightReaction = highlightReactionData.find(highlightReaction => highlightReaction.emoji_id === emoji.id)!;

            const reactedByUser = userHighlightReactionData.some(userHighlightReaction => userHighlightReaction.emoji_id === emoji.id);

            return {
                url: emoji.url,
                reaction_count: highlightReaction.reaction_count,
                reactedByUser,
                emojiId: emoji.id
            };
        });


        setHighlightReactions(highlightReactionsWithEmojiUrls);
    }

    useEffect(() => {
        void fetchHighlightReactions();
    }, []);

    const { url, title, login, highlight: highlightText } = highlight;

    const openGraphSearchParameter = url.split("/").slice(3)
        .join("/");
    const openGraphUrl = `https://opengraph.githubassets.com/1/${openGraphSearchParameter}`;

    const addReactionToHighlight = async (highlightId: string, emojiId: string) => {
        await reactOnHighlight(await getAuthToken(), highlightId, emojiId);
        setReactingDivOpen(false);
        await fetchHighlightReactions();
    };

    const removeReactionFromHighlight = async (highlightId: string, emojiId: string) => {
        await removeReactionOnHighlight(await getAuthToken(), highlightId, emojiId);
        await fetchHighlightReactions();
    };

    return (
        <div className="border border-white/40 rounded-md p-3 mt-2 bg-white">
            {/* fixed height, content ellipsis */}
            <h3 className="
                text-base font-medium
                overflow-hidden
                line-clamp-2
                h-6
                leading-5
            "
            >
                <a
                    className="text-slate-800 cursor-pointer"
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {title}
                </a>
            </h3>

            <div className="flex items-center">
                <span className="mr-2 text-slate-500">Author:</span>

                <a
                    className="text-orange cursor-pointer"
                    href={`https://insights.opensauced.pizza/user/${login}`}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {login}
                </a>
            </div>

            <p className="
                py-2 text-sm text-slate-500
                overflow-hidden
                line-clamp-3
                h-16
                leading-5
            "
            >
                {highlightText}
            </p>

            <img
                alt="OpenGraph"
                src={openGraphUrl}
            />

            <div className="flex gap-2 mt-2 h-6 items-center">
                <div className="flex gap-1 items-center">
                    <button
                        aria-haspopup="menu"
                        className="p-0.5 rounded-full bg-lightOrange"
                        type="button"
                        onClick={() => setReactingDivOpen(!reactingDivOpen)}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="hsla(19, 100%, 50%, .3)"
                            height="1em"
                            stroke="currentColor"
                            strokeWidth="0"
                            viewBox="0 0 24 24"
                            width="1em"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                            />
                        </svg>
                    </button>
                </div>

                <div
                    aria-labelledby="options-menu"
                    aria-orientation="vertical"
                    className={`${reactingDivOpen ? "block" : "hidden"} rounded-full shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none flex`}
                    id="reacting-div"
                    role="menu"
                >
                    {emojis.map(emoji => (
                        <div
                            key={emoji.name}
                            className="p-2 text-sm hover:bg-gray-100 flex gap-2 items-center cursor-pointer"
                            role="menuitem"
                            tabIndex={-1}
                            onClick={async () => {
                                await addReactionToHighlight( highlight.id, emoji.id);
                            }}
                            onKeyDown={async () => {
                                await addReactionToHighlight( highlight.id, emoji.id);
                            }}
                        >
                            <img
                                alt="Emoji"
                                className="rounded-full w-6 aspect-square border border-orange p-1"
                                src={emoji.url}
                            />
                        </div>
                    ))}
                </div>


                {
                    highlightReactions.length > 0 && !reactingDivOpen
                        ? (
                            highlightReactions.map(highlightReaction => (
                                <div
                                    key={highlightReaction.url}
                                    className="flex gap-1 items-center"
                                    role="button"
                                    tabIndex={0}
                                    onClick={
                                        highlightReaction.reactedByUser
                                            ? async () => {
                                                await removeReactionFromHighlight(highlight.id, highlightReaction.emojiId);
                                            }
                                            : async () => {
                                                await addReactionToHighlight(highlight.id, highlightReaction.emojiId);
                                            }
                                    }
                                    onKeyDown={
                                        highlightReaction.reactedByUser
                                            ? async () => {
                                                await removeReactionFromHighlight(highlight.id, highlightReaction.emojiId);
                                            }
                                            : async () => {
                                                await addReactionToHighlight(highlight.id, highlightReaction.emojiId);
                                            }
                                    }
                                >
                                    <img
                                        alt="Emoji"
                                        className={`rounded-full w-6 aspect-square border border-orange p-1 ${highlightReaction.reactedByUser ? "bg-lightOrange" : ""}`}
                                        src={highlightReaction.url}
                                    />

                                    <span className="text-slate-500">
                                        {highlightReaction.reaction_count}
                                    </span>
                                </div>
                            )))
                        : null
                }
            </div>

        </div>);
};
