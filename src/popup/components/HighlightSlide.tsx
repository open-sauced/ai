import { useEffect, useState } from "react";
import { getHighlightReactions } from "../../utils/fetchOpenSaucedApiData";

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
    const [highlightReactions, setHighlightReactions] = useState<Record<string, string>[]>([]);

    useEffect(() => {
        async function fetchHighlightReactions () {
            const highlightReactionData = await getHighlightReactions(highlight.id);

            const highlightReactionsWithEmojiUrls = emojis.filter(emoji => highlightReactionData.some(highlightReaction => highlightReaction.emoji_id === emoji.id)).map(emoji => {
                const highlightReaction = highlightReactionData.find(highlightReaction => highlightReaction.emoji_id === emoji.id)!;

                return {
                    url: emoji.url,
                    reaction_count: highlightReaction.reaction_count,
                    highlight_url: highlight.url,
                };
            });


            setHighlightReactions(highlightReactionsWithEmojiUrls);
        }
        void fetchHighlightReactions();
    }, []);

    const { url, title, login, highlight: highlightText } = highlight;

    const openGraphSearchParameter = url.split("/").slice(3)
        .join("/");
    const openGraphUrl = `https://opengraph.githubassets.com/1/${openGraphSearchParameter}`;

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
                {
                    highlightReactions.length > 0
                        ? (
                            highlightReactions.map(highlightReaction => (
                                <div
                                    key={highlightReaction.url}
                                    className="flex gap-1 items-center"
                                >
                                    <img
                                        alt="Emoji"
                                        className="rounded-full w-6 aspect-square border border-orange p-1"
                                        src={highlightReaction.url}
                                    />

                                    <span className="text-slate-500">
                                        {highlightReaction.reaction_count}
                                    </span>
                                </div>
                            )))
                        : (
                            <span className="text-slate-500">
                            No reactions yet.
                            </span>
                        )
                }
            </div>

        </div>);
};
