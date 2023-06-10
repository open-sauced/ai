
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

    return (
        <div className="border border-white/40 rounded-sm p-3 mt-2">
            <h3 className="text-base font-medium">
                <a
                    className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
                    href={url}
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    {title}
                </a>
            </h3>


            <div className="flex items-center">
                <div className="mr-2">Author:</div>

                <a
                    className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
                    href={`https://insights.opensauced.pizza/user/${login}`}
                    rel="noopener noreferrer"
                    target="_blank"


                >
                    {login}
                </a>
            </div>

            <p className="py-2">
                {highlightText}
            </p>

        </div>);
};
