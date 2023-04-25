import { useState, useEffect } from "react";
import { OPEN_SAUCED_AUTH_TOKEN_KEY } from "./constants";
import Start from "./pages/start";
import Home from "./pages/home";
import Loading from "./pages/loading";
import { checkTokenValidity } from "./utils/fetchOpenSaucedApiData";

function App() {
  const [osAccessToken, setOsAccessToken] = useState("");
  // renderedPage can be either "start", "home" or "loading"
  const [renderedPage, setRenderedPage] = useState("loading");

  useEffect(() => {
    chrome.storage.sync.get([OPEN_SAUCED_AUTH_TOKEN_KEY], (result) => {
      const authToken: string | undefined = result[OPEN_SAUCED_AUTH_TOKEN_KEY];
      if (authToken) {
        checkTokenValidity(authToken).then((valid) => {
          if (!valid) {
            setOsAccessToken("");
            setRenderedPage("signin");
          } else {
            setOsAccessToken(authToken);
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
