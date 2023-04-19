import { useState, useEffect } from "react";

import Start from "./pages/start";
import SignIn from "./pages/signin";
import Home from "./pages/home";
import Loading from "./pages/loading";

import { checkTokenValidity } from "./utils/fetchOpenSaucedApiData";

function App() {
  const [osAccessToken, setOsAccessToken] = useState("");
  // renderedPage can be either "start", "home", "signin" or "loading"
  const [renderedPage, setRenderedPage] = useState("loading");

  useEffect(() => {
    async function checkAuth() {
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
    }
    checkAuth();
  }, []);

  return (
    <div className="p-4">
      {renderedPage === "start" ? (
        <Start setRenderedPage={setRenderedPage} />
      ) : renderedPage === "home" ? (
        <Home osAccessToken={osAccessToken} setRenderedPage={setRenderedPage} />
      ) : renderedPage === "signin" ? (
        <SignIn setRenderedPage={setRenderedPage} />
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default App;
