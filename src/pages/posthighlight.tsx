import { useContext, useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { RouteContext } from "../App";
import { useAuth } from "../hooks/useAuth";


const PostOnHighlight = () => {
  const { authToken } = useAuth();
  const { setCurrentPage } = useContext(RouteContext);
  const [pageURL, setPageURL] = useState("");
  const [highlightTitle, setHighlightTitle] = useState("");
  const [highlightContent, setHighlightContent] = useState("");
  const [isSendButtonEnabled, enableSendButton] = useState(true);


  // post highlight function
  const postHighlight = async () => {
    const response = await fetch("https://api.opensauced.pizza/v1/user/highlights", {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        method: "POST",
        body: JSON.stringify({
          url: pageURL,
          title: highlightTitle,
          highlight: highlightContent,
        }),

    });
    const data = await response.json();

    console.log(data);
  };


  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    console.log(tabs);
    setPageURL(tabs[0]?.url ?? "");

    chrome.tabs.sendMessage(tabs[0].id ?? 0, { type: "get_highlight" }, setHighlightTitle);
});


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

        <input
          className="p-1.5 rounded-md mb-2 w-full text-black"
          maxLength={50}
          placeholder="Your title here"
          type="text"
          value={highlightTitle}
          onChange={e => setHighlightTitle(e.target.value)}
        />

        <textarea
          className="p-1.5 rounded-md mb-2 w-full text-black"
          placeholder="Your text here"
          rows={5}
          value={highlightContent}
          onChange={e => setHighlightContent(e.target.value)}
        />

        <button
          className="inline-block disabled:bg-gray-500 text-black bg-gh-white rounded-md p-2 text-sm font-semibold text-center select-none w-full border hover:shadow-button hover:no-underline"
          onClick={postHighlight}
        >
            Post
        </button>
        </main>
    </div>
  );
};

export default PostOnHighlight;
