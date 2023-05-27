import {
    HiArrowTopRightOnSquare,
    HiOutlineQuestionMarkCircle,
    HiPencil,
    HiUserCircle,
} from "react-icons/hi2";
import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { useAuth } from "../hooks/useAuth";
import { useOpensaucedUserCheck } from "../hooks/useOpensaucedUserCheck";
import { Profile } from "./profile";
import { goTo } from "react-chrome-extension-router";
import AIPRDescription from "./aiprdescription";
import Help from "./help";
import {OPEN_SAUCED_INSIGHTS_DOMAIN } from "../constants";

const Home = () => {
    const { user } = useAuth();
    const { currentTabIsOpensaucedUser, checkedUser } = useOpensaucedUserCheck();

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
                </footer>
            </div>
        </div>
    );
};

export default Home;
