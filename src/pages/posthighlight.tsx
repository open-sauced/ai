import { useContext } from "react";
import { FaChevronLeft } from "react-icons/fa";
import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { RouteContext } from "../App";
import GhOpenGraphImg from "../content-scripts/components/githhub-open-graph";


const PostOnHighlight = () => {
  const { setCurrentPage } = useContext(RouteContext);

  return (
    <div className="grid grid-cols-1 divide-y divider-y-center-2 min-w-[320px]">
        <header className="flex justify-between">
          <div className="flex items-center gap-2">
            <button
              className="rounded-full p-2 bg-slate-700 hover:bg-slate-700/50"
              onClick={() => {
                setCurrentPage("home");
              }}
            >
              <FaChevronLeft className="text-osOrange text-white" />
            </button>

            <img
              alt="OpenSauced logo"
              className="w-[100%]"
              src={OpenSaucedLogo}
            />
          </div>
        </header>

        <main className="text-white">

        <GhOpenGraphImg
          githubLink={"https://github.com/open-sauced/insights/pull/1184"}
        />

        <input
          className="p-1.5 rounded-md mb-2 w-full text-black"
          maxLength={50}
          placeholder="Your title here"
          type="text"
        />

        <textarea
          className="p-1.5 rounded-md mb-2 w-full text-black"
          placeholder="Your text here"
          rows={5}
        />

        <button
          className="inline-block disabled:bg-gray-500 text-black bg-gh-white rounded-md p-2 text-sm font-semibold text-center select-none w-full border hover:shadow-button hover:no-underline"
        >
            Post
        </button>
        </main>
    </div>
  );
};

export default PostOnHighlight;
