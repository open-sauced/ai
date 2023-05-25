import { useEffect } from "react";
import Start from "./pages/start";
import Home from "./pages/home";
import Loading from "./pages/loading";
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
