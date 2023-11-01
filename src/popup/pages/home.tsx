import {
    HiArrowTopRightOnSquare,
    HiOutlineQuestionMarkCircle,
    HiPencil,
    HiUserCircle,
} from "react-icons/hi2";
import { IoLogoLinkedin } from "react-icons/io5";
import { FiSettings, FiExternalLink } from "react-icons/fi";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import OpenSaucedLogo from "../../assets/opensauced-logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { useOpensaucedUserCheck } from "../../hooks/useOpensaucedUserCheck";
import { Profile } from "./profile";
import { goTo } from "react-chrome-extension-router";
import PostOnHighlight from "./posthighlight";
import { getEmojis, getHighlights, getRepoOpenSaucedURL } from "../../utils/fetchOpenSaucedApiData";
import Help from "./help";
import { useEffect, useState, useRef } from "react";
import Settings from "./settings";
import { OPEN_SAUCED_INSIGHTS_DOMAIN } from "../../constants";
import { MessageType, type Highlight, type Message } from "../../ts/types";
import { usGetGitHubPageInfo } from "../../hooks/useGetGitHubPageInfo";
import { HighlightSlide } from "../components/HighlightSlide";

const Home = ({ forceRefresh }: { forceRefresh: boolean } = { forceRefresh: false }) => {
    const { user } = useAuth();
    const { currentTabIsOpensaucedUser, checkedUser } = useOpensaucedUserCheck();
    const { pageUrl, pageTitle, type: GitHubPageType } = usGetGitHubPageInfo();
    const [repoOpenSaucedURL, setRepoOpenSaucedURL] = useState<string>("");
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [emojis, setEmojis] = useState<Record<string, string>[]>([]);
    const toolsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchHighlights = async () => {
            try {
                const userHighlightsData = await getHighlights(forceRefresh);

                if (!userHighlightsData) {
                    return;
                }
                const highlights = userHighlightsData.data;

                setHighlights(highlights);
            } catch (error) {
                console.log(error);
            }
        };

        const fetchEmojis = async () => {
            try {
                const emojiResponse = await getEmojis();
                const emojis = emojiResponse.data;

                if (!emojis.length) {
                    return;
                }

                setEmojis(emojis);
            } catch (error) {
                console.log(error);
            }
        };

        void fetchHighlights();
        void fetchEmojis();
    }, []);

    useEffect(() => {
        const fetchRepoOpenSaucedURL = async () => {
            try {
                const openSaucedUrl = await getRepoOpenSaucedURL(pageUrl);

                setRepoOpenSaucedURL(openSaucedUrl);
            } catch (error) {
                console.log(error);
            }
        };

        if (GitHubPageType === "REPO") {
            void fetchRepoOpenSaucedURL();
        }
    }, [pageUrl]);

    return (
        <div className="p-4 bg-slate-800">
            <div className="grid grid-cols-1 divide-y divide-white/40 divider-y-center-2 min-w-[320px] text-white">
                <header className="flex justify-between">
                    <img
                        alt="OpenSauced logo"
                        className="w-[45%] cursor-pointer hover:opacity-80 transition-opacity duration-300 ease-in-out"
                        role="presentation"
                        src={OpenSaucedLogo}
                        onClick={() => {
                            window.open(`https://${OPEN_SAUCED_INSIGHTS_DOMAIN}/feed`, "_blank");
                        }}
                        onKeyDown={e => {
                            if (e.key === "Enter") {
                                window.open(`https://${OPEN_SAUCED_INSIGHTS_DOMAIN}/feed`, "_blank");
                            }
                        }}
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
                    <a
                        className="flex items-center text-white hover:text-orange no-underline gap-2 w-full font-medium text-lg leading-10"
                        href={`https://${OPEN_SAUCED_INSIGHTS_DOMAIN}/feed`}
                        rel="noreferrer"
                        target="_blank"
                    >
                        Highlights feed
                        <HiArrowTopRightOnSquare />
                    </a>

                    {highlights.length > 0 && emojis.length > 0 && (
                        <Swiper
                            navigation
                            modules={[Navigation, Pagination, A11y]}
                            pagination={{ clickable: true }}
                            slidesPerView={1}
                            spaceBetween={50}
                        >
                            {
                                highlights.map((highlight, index) => (
                                    <SwiperSlide key={index}>
                                        <HighlightSlide
                                            emojis={emojis}
                                            highlight={highlight}
                                        />
                                    </SwiperSlide>
                                ))
                            }
                        </Swiper>
                    )}

                    {Boolean(toolsRef.current?.children.length) && <h3 className="text font-medium text-base leading-10">Tools:</h3>}

                    <div
                        ref={toolsRef}
                        className="tools flex flex-col gap-2"
                    >

                        {GitHubPageType === "REPO" && (
                            <>
                                <button
                                    className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
                                    onClick={() => {
                                        const message: Message = {
                                            type: MessageType.LinkedInProject,
                                            data: { url: pageUrl },
                                        };

                                        void chrome.runtime.sendMessage(message);
                                    }}
                                >
                                    <IoLogoLinkedin />
                                Add to LinkedIn Projects.
                                </button>

                                {
                                    repoOpenSaucedURL && (
                                        <a
                                            className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
                                            href={repoOpenSaucedURL}
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <FiExternalLink />
                                            View On OpenSauced
                                        </a>
                                    )
                                }
                            </>
                        )}

                        {GitHubPageType === "PR" && (
                            <button
                                className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
                                onClick={() => {
                                    goTo(
                                        PostOnHighlight,
                                        {
                                            prUrl: pageUrl,
                                            prTitle: pageTitle,
                                        },
                                    );
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
