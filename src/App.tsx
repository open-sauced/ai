import { useEffect } from "react";
import Start from "./popup/pages/start";
import Home from "./popup/pages/home";
import Loading from "./popup/pages/loading";
import { useAuth } from "./hooks/useAuth";
import { goTo } from "react-chrome-extension-router";

const App = () => {
  const { isTokenValid } = useAuth();


  useEffect(() => {
    if (isTokenValid) {
      goTo(Home);
    } else {
      goTo(Start);
    }
  }, [isTokenValid]);

  return (
      <Loading />
  );
};

export default App;
