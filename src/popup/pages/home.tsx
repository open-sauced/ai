import {
    HiArrowTopRightOnSquare,
    HiOutlineQuestionMarkCircle,
    HiPencil,
    HiUserCircle,
} from "react-icons/hi2";
import { IoLogoLinkedin } from "react-icons/io5";
import { FiSettings } from "react-icons/fi";
import { Navigation, Pagination, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import OpenSaucedLogo from "../../assets/opensauced-logo.svg";
import { useAuth } from "../../hooks/useAuth";
import { useOpensaucedUserCheck } from "../../hooks/useOpensaucedUserCheck";
import { Profile } from "./profile";
import { goTo } from "react-chrome-extension-router";
import PostOnHighlight from "./posthighlight";
import { getRepoAPIURL } from "../../utils/urlMatchers";
import { getEmojis, getHighlights } from "../../utils/fetchOpenSaucedApiData";
import Help from "./help";
import { useEffect, useState, useRef } from "react";
import Settings from "./settings";
import { OPEN_SAUCED_INSIGHTS_DOMAIN } from "../../constants";
import type { Highlight } from "../../ts/types";
import { usGetGitHubPageInfo } from "../../hooks/useGetGitHubPageInfo";
import { HighlightSlide } from "../components/HighlightSlide";

const Home = () => {
    const { user } = useAuth();
    const { currentTabIsOpensaucedUser, checkedUser } = useOpensaucedUserCheck();
    const { prUrl: pageURL, prTitle, type: GitHubPageType } = usGetGitHubPageInfo();
    const [highlights, setHighlights] = useState<Highlight[]>([]);
    const [emojis, setEmojis] = useState<Record<string, string>[]>([]);
    const toolsRef = useRef<HTMLDivElement>(null);

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

        const fetchEmojis = async () => {
            try {
                const emojiResponse = await getEmojis();
                const emojis = emojiResponse.data;

                if (!emojis) {
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
                            <button
                                className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
                                onClick={() => {
                                    function populateDataToLinkedIn (data: any) {
                                        const inputFields: NodeListOf<HTMLInputElement> = document.querySelectorAll(".artdeco-text-input--input");

                                        if (inputFields.length === 0) {
                                            // set timeout to wait for the page to load
                                            setTimeout(() => {
                                                populateDataToLinkedIn(data);
                                            }, 500);

                                            return;
                                        }
                                        console.log(inputFields);
                                        inputFields[0].value = data.name;
                                        inputFields[1].value = data.description;
                                    }
                                    fetch(getRepoAPIURL(pageURL)).then(async res => res.json())
                                        .then(data => chrome.tabs.create(
                                            { url: "https://www.linkedin.com/in/me/edit/forms/project/new/", active: true },
                                            tab => {
                                                chrome.scripting
                                                    .executeScript({
                                                        target: { tabId: tab.id! },
                                                        func: populateDataToLinkedIn,
                                                        args: [data],
                                                    })
                                                    .then(() => console.log("script injected"))
                                                    .catch(err => console.log(err));
                                            },

                                        ))
                                        .catch(err => console.log(err));
                                }}
                            >
                                <IoLogoLinkedin />
                                Add to LinkedIn Projects.
                            </button>
                        )}

                        {GitHubPageType === "PR" && (
                            <button
                                className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
                                onClick={() => {
                                    goTo(PostOnHighlight, { pageURL, prTitle });
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
