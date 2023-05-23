import { HiArrowTopRightOnSquare, HiPencil, HiUserCircle, HiSquare3Stack3D } from "react-icons/hi2";
import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { useAuth } from "../hooks/useAuth";
import { useOpensaucedUserCheck } from "../hooks/useOpensaucedUserCheck";
import { Profile } from "./profile";
import { goTo } from "react-chrome-extension-router";
import AIPRDescription from "./aiprdescription";
import Resources from "./resources";

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
            href="https://insights.opensauced.pizza/feed"
            rel="noreferrer"
            target="_blank"
          >
            <HiArrowTopRightOnSquare />
            Go to Highlights feed
          </a>

          <a
            className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
            href="https://insights.opensauced.pizza"
            rel="noreferrer"
            target="_blank"
          >
            <HiArrowTopRightOnSquare />
            Go to Dashboard
          </a>

          <button
            className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
            onClick={() => {
              goTo(AIPRDescription);
            }}
          >
            <HiPencil />
            AI PR Description
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

          <button
            className="flex items-center bg-slate-700 hover:bg-slate-700/70 hover:text-orange text-white gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
            onClick={() => {
              goTo(Resources);
            }}
          >
            <HiSquare3Stack3D />
            Resources
          </button>
        </div>
      </main>
    </div>
  </div>
  );
};

export default Home;
