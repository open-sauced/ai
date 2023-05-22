import { useContext } from "react";

import { FaChevronLeft } from "react-icons/fa";
import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { RouteContext } from "../App";
import { Toaster } from "react-hot-toast";
import { DISCUSSIONS, ISSUES } from "../constants";
import { HiArrowTopRightOnSquare } from "react-icons/hi2";

const externalLinks = [DISCUSSIONS, ISSUES];

const Resources = () => {
  const { setCurrentPage } = useContext(RouteContext);

  return (
    <>
      <Toaster />

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

        <main className="main-content text-white">
          <h3 className="text font-medium text-base leading-10">
            External Resources:
          </h3>

          <div className="tools flex flex-col gap-2">
            {externalLinks.map(externalLink => (
              <a
                key={externalLink.key}
                className="flex items-center bg-slate-700 hover:bg-slate-700/70 text-white hover:text-orange no-underline gap-2 p-1.5 px-3 w-full rounded-sm font-medium text-sm"
                href={externalLink.link}
                rel="noreferrer"
                target="_blank"
              >
                <HiArrowTopRightOnSquare />

                {externalLink.displayValue}
              </a>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Resources;
