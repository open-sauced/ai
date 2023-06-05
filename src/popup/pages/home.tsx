import {
    HiArrowLeft,
    HiArrowRight,
    HiArrowTopRightOnSquare,
    HiOutlineQuestionMarkCircle,
    HiPencil,
    HiUserCircle,
} from "react-icons/hi2";
import { FiSettings } from "react-icons/fi";
import OpenSaucedLogo from "../../assets/opensauced-logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { useOpensaucedUserCheck } from "../../hooks/useOpensaucedUserCheck";
import { Profile } from "./profile";
import { goTo } from "react-chrome-extension-router";
import AIPRDescription from "./aiprdescription";
import PostOnHighlight from "./posthighlight";
import { getHighlights } from "../../utils/fetchOpenSaucedApiData";

import Help from "./help";
import { useEffect, useState } from "react";
import Settings from "./settings";
import { OPEN_SAUCED_INSIGHTS_DOMAIN } from "../../constants";
import type { Highlight } from "../../ts/types";
import { useIsGithubPRPageCheck } from "../../hooks/useGithubPRPageCheck";

const Home = () => {
    const { user } = useAuth();
    const { currentTabIsOpensaucedUser, checkedUser } = useOpensaucedUserCheck();
    const { isGithubPRPage, prUrl, prTitle } = useIsGithubPRPageCheck();
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchHighlights = async () => {
            try {
                const userHighlightsData = await getHighlights();

                if (!userHighlightsData) {
                    return;
                }
                const highlights = userHighlightsData.data;

                setHighlights(highlights);
            } catch (error) {
                console.log(error);
            }
        };

        void fetchHighlights();
    }, []);

    const handlePrevious = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const handleNext = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    return (
        <div className="p-4 bg-slate-800">
            <div className="grid grid-cols-1 divide-y divide-white/40 divider-y-center-2 min-w-[320px] text-white">
                <header className="flex justify-between">
                    <img
                        alt="OpenSauced logo"
                        className="w-[45%]"
                        src={OpenSaucedLogo}
                    />


                    {user && (
                        <button
                            className="flex gap-1 items-center hover:text-orange text-white no-underline"
                            onClick={() => {
                                goTo(Profile, { username: user.user_name });
                            }}
                        >
                            {user.user_name}

                            <img
                                alt="User avatar"
                                className="rounded-full w-6 aspect-square border border-orange"
                                src={`https://github.com/${user.user_name}.png`}
                            />
                        </button>
                    )}
                </header>

                <main className="main-content">
                    <h3 className="text font-medium text-base leading-10">Latest Highlight:</h3>

                    {highlights.length > 0 && (

                        <div className="border border-white/40 rounded-sm p-3 mt-2">
                            <h3 className="text-base font-medium">
                                <a
                                    className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
                                    href={highlights[currentPage]?.url}
                                    rel="noopener noreferrer"
                                    target="_blank"
                                >
                                    {highlights[currentPage]?.title}
                                </a>
                            </h3>


                            <div className="flex items-center">
                                <div className="mr-2">Author:</div>

                                <a
                                    className="text-blue-500 hover:text-blue-700 underline cursor-pointer"
                                    href={`https://insights.opensauced.pizza/user/${highlights[currentPage]?.login}`}
                                    rel="noopener noreferrer"
                                    target="_blank"


                                >
                                    {highlights[currentPage]?.login}
                                </a>
                            </div>

                            <p className="py-2">
                                {highlights[currentPage]?.highlight}
                            </p>

                            <div className="flex justify-center">
                                <div className="flex justify-center mt-4">
                                    <button
                                        className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:opacity-50"
                                        disabled={currentPage === 0}
                                        onClick={handlePrevious}
                                    >
                                        <HiArrowLeft />
                                    </button>

                                    <button
                                        className="px-4 py-2 rounded-md bg-blue-500 text-white disabled:opacity-50 ml-4"
                                        disabled={currentPage === highlights.length - 1}
                                        onClick={handleNext}
                                    >
                                        <HiArrowRight />
                                    </button>
                                </div>
                            </div>
                        </div>)}

                    <h3 className="text font-medium text-base leading-10">Tools:</h3>

                    <div className="tools flex flex-col gap-2">
                        <a
                            className="flex items-center bg-slate-700 hover:bg-slate-700/70 text-white hover:text-orange no-underline gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
                            href={`https://${OPEN_SAUCED_INSIGHTS_DOMAIN}/feed`}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <HiArrowTopRightOnSquare />
                            Highlights feed
                        </a>

                        <a
                            className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
                            href={`https://${OPEN_SAUCED_INSIGHTS_DOMAIN}/feed`}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <HiArrowTopRightOnSquare />
                            Dashboard
                        </a>

                        <button
                            className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
                            onClick={() => {
                                goTo(AIPRDescription);
                            }}
                        >
                            <HiPencil />
                            AI Configuration
                        </button>

                        {isGithubPRPage && (
                            <button
                                className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
                                onClick={() => {
                                    goTo(PostOnHighlight, { prUrl, prTitle });
                                }}
                            >
                                <HiPencil />
                                Post Highlight
                            </button>)}

                        {currentTabIsOpensaucedUser && (
                            <button
                                className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
                                onClick={() => {
                                    goTo(Profile, { username: checkedUser });
                                }}
                            >
                                <HiUserCircle />
                                View

                                {" "}

                                {checkedUser}
                                &apos;s profile
                            </button>
                        )}
                    </div>
                </main>

                <footer className="tools flex gap-2">
                    <button
                        className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-fit rounded-sm font-medium text-sm"
                        onClick={() => {
                            goTo(Help);
                        }}
                    >
                        <HiOutlineQuestionMarkCircle />
                        Help
                    </button>

                    <button
                        className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-fit rounded-sm font-medium text-sm"
                        onClick={() => {
                            goTo(Settings);
                        }}
                    >
                        <FiSettings />
            Settings
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default Home;
