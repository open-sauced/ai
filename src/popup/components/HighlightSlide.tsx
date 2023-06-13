
interface HighlightSlideProps {
    highlight: {
        url: string;
        title: string;
        login: string;
        highlight: string;
    };
}

export const HighlightSlide = ({ highlight }: HighlightSlideProps) => {
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

        </div>);
};
