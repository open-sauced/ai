import { useContext, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { RouteContext } from "../App";
import { useAuth } from "../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";
import { cerateHighlight } from "../utils/fetchOpenSaucedApiData";


const PostOnHighlight = () => {
  const { authToken, user } = useAuth();
  const { setCurrentPage } = useContext(RouteContext);
  const [pageURL, setPageURL] = useState("");
  const [highlightTitle, setHighlightTitle] = useState("");
  const [highlightContent, setHighlightContent] = useState("");
  const [isSendButtonEnabled, enableSendButton] = useState(true);


  // post highlight function
  const postHighlight = () => {
    enableSendButton(false);
    const postHighlightAPI = cerateHighlight((authToken ?? ""), pageURL, highlightTitle, highlightContent);

    toast.promise(postHighlightAPI, {
      loading: "Loading ...",
      success: data => {
        enableSendButton(true);
        if (!data.ok) {
          throw new Error(`Statues code ${data.status}`);
        }
        return (
          <span>
          check the highlight at:
          <a
            href={`https://insights.opensauced.pizza/user/${user.user_name}/highlights`}
            rel="noreferrer"
            target="_blank"
          >
{" "}
your account
          </a>
          </span>
          );
      },
      error: e => {
        enableSendButton(true);
        return `Uh oh, there was an error! ${e.message}`;
      },
    }).catch(console.error);
  };


  chrome.tabs.query({ currentWindow: true, active: true }, tabs => {
    setPageURL(tabs[0]?.url ?? "");

    chrome.tabs.sendMessage(tabs[0].id ?? 0, { type: "get_highlight" }, setHighlightTitle);
  });


  return (
    <div className="grid grid-cols-1 divide-y divider-y-center-2 min-w-[320px]">
      <Toaster />

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
          disabled={!isSendButtonEnabled}
          onClick={postHighlight}
        >
          Post
        </button>
      </main>
    </div>
  );
};

export default PostOnHighlight;
