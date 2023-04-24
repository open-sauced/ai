import { useState, useEffect } from "react";

import Start from "./pages/start";
import Home from "./pages/home";
import Loading from "./pages/loading";

import { checkTokenValidity } from "./utils/fetchOpenSaucedApiData";

function App() {
  const [osAccessToken, setOsAccessToken] = useState("");
  // renderedPage can be either "start", "home" or "loading"
  const [renderedPage, setRenderedPage] = useState("loading");

  useEffect(() => {
    chrome.storage.sync.get(["os-access-token"], (result) => {
      if (result["os-access-token"]) {
        checkTokenValidity(result["os-access-token"]).then((valid) => {
          if (!valid) {
            setOsAccessToken("");
            setRenderedPage("signin");
          } else {
            setOsAccessToken(result["os-access-token"]);
            setRenderedPage("home");
          }
        });
      } else {
        setRenderedPage("start");
      }
    });
  }, []);

  return (
    <div className="p-4 bg-slate-800">
      {renderedPage === "start" ? (
        <Start setRenderedPage={setRenderedPage} />
      ) : renderedPage === "home" ? (
        <Home osAccessToken={osAccessToken} setRenderedPage={setRenderedPage} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
