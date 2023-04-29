import { useContext, useEffect, useState } from "react";
import { FaBrain, FaChevronLeft, FaRobot } from "react-icons/fa";
import { RiLinkedinFill, RiLinkM, RiTwitterFill } from "react-icons/ri";
import { AiOutlineReload } from "react-icons/ai";
import { SiC, SiCplusplus, SiCsharp, SiGoland, SiJavascript, SiPhp, SiPython, SiReact, SiRuby, SiRust, SiTypescript } from "react-icons/si";
import { DiJava } from "react-icons/di";
import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { getUserData, getUserPRData } from "../utils/fetchOpenSaucedApiData";
import { RouteContext } from "../App";

const interestIcon = {
  python: <SiPython />,
  java: <DiJava />,
  javascript: <SiJavascript />,
  typescript: <SiTypescript />,
  csharp: <SiCsharp />,
  cpp: <SiCplusplus />,
  c: <SiC />,
  php: <SiPhp />,
  ruby: <SiRuby />,
  react: <SiReact />,
  ml: <FaBrain />,
  ai: <FaRobot />,
  golang: <SiGoland />,
  rust: <SiRust />,
};

type InterestIconKeys = keyof typeof interestIcon;

export const Profile = () => {
  const { page, setCurrentPage } = useContext(RouteContext);
  const [user, setUser] = useState<null | { id: string, user_name: string, bio: string, created_at: string, linkedin_url: string, twitter_username: string, blog: string, interests: string, open_issues: number }>(null);
  const [userPR, setUserPR] = useState<null | { meta: { itemCount: number } }>(null);

useEffect(() => {
    const fetchUserData = async () => {
        const [userData, userPRData] = await Promise.all([getUserData(page.props.userName), getUserPRData(page.props.userName)]);

        setUser(userData);
        setUserPR(userPRData);
    };

    fetchUserData();
}, []);


  return (
    <div className="grid grid-cols-1 divide-y divider-y-center-2 min-w-[320px] text-white">
      <header className="flex justify-between">
        <div className="flex items-center gap-2">
          <button
            className="rounded-full p-2 bg-slate-700 hover:bg-slate-700/50"
            onClick={() => {
 setCurrentPage("home");
}}
          >
            <FaChevronLeft className="text-osOrange" />
          </button>

          <img
            alt="OpenSauced logo"
            className="w-[100%]"
            src={OpenSaucedLogo}
          />
        </div>

        <button
          className="hover:text-orange text-lg"
          title="Refresh user data"
          onClick={async () => {
            const [userData, userPRData] = await Promise.all([getUserData(page.props.userName), getUserPRData(page.props.userName)]);

            setUser(userData);
            setUserPR(userPRData);
          }}
        >
          <AiOutlineReload />
        </button>
      </header>

      <main>
        <div className="flex flex-col items-center gap-1 mb-4">
          <img
            alt="profile image"
            className="rounded-full w-14 aspect-square p-1 bg-slate-700"
            src={`https://github.com/${page.props.userName}.png`}
          />

          <p className="font-medium">
@
{page.props.userName}
          </p>

          {(user?.linkedin_url || user?.twitter_username) &&
            <div className="social flex gap-0.5">
              {user.linkedin_url &&
                <a
                  className="rounded-sm border bg-slate-700 hover:bg-slate-700/50 hover:text-orange p-1"
                  href={user.linkedin_url}
                  rel="noreferrer"
                  target="_blank"
                  title={user.linkedin_url}
                >
                  <RiLinkedinFill className="text-lg" />
                </a>}

              {user.twitter_username &&
                <a
                  className="rounded-sm border bg-slate-700 hover:bg-slate-700/50 hover:text-orange p-1"
                  href={`https://twitter.com/${user.twitter_username}`}
                  rel="noreferrer"
                  target="_blank"
                  title={`https://twitter.com/${user.twitter_username}`}
                >
                  <RiTwitterFill className="text-lg" />
                </a>}
            </div>}

          {user?.bio && <span>
{user.bio}
                        </span>}

          {user?.blog &&
            <a
              className="flex text-orange items-center gap-0.5"
              href={user.blog}
              rel="noreferrer"
              target="_blank"
            >
              <RiLinkM />

              {user.blog}
            </a>}
        </div>

        <div className="grid grid-cols-2 text-white bg-osOrange -mx-4 mb-4 p-4 py-8">
          <div className="flex flex-col items-center justify-center p-2 text-xs">
            <p>Open Issues</p>

            <p className="font-medium text-5xl">
{user?.open_issues}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-2 text-xs">
            <p>PRs Made</p>

            <p className="font-medium text-5xl">
{userPR?.meta.itemCount}
            </p>
          </div>

          <div className="flex flex-col items-center justify-center p-2 text-xs">
            <p>Avg PRs Velocity</p>

            <p className="font-medium text-5xl">-</p>
          </div>

          <div className="flex flex-col items-center justify-center p-2 text-xs">
            <p>Contributed Repos</p>

            <p className="font-medium text-5xl">-</p>
          </div>
        </div>

        <div>
            <h2 className="font-medium text-lg mb-2">Current Interest</h2>

            <div
              className="flex gap-1.5"
              style={{ flexWrap: "wrap" }}
            >
              {user?.interests.split(",").map(interest => (
                <a
                  key={interest}
                  className="flex gap-1 items-center p-1.5 px-4 rounded-full bg-slate-700 hover:bg-slate-700/50"
                  href={`https://insights.opensauced.pizza/${interest}/dashboard/filter/recent`}
                  rel="noreferrer"
                  target="_blank"
                  title={`https://insights.opensauced.pizza/${interest}/dashboard/filter/recent`}
                >
                  {interestIcon[interest as InterestIconKeys] ?? null}

                  {interest}
                </a>
              ))}
            </div>
        </div>
      </main>
    </div>
  );
};
