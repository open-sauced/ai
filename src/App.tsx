import { useState, useEffect, createContext } from "react";

import Start from "./pages/start";
import Home from "./pages/home";
import Loading from "./pages/loading";
import { Profile } from "./pages/profile";
import { useAuth } from "./hooks/useAuth";

export const RouteContext = createContext<{ page: { name: string, props?: any }, setCurrentPage:(page: RouteKeys, props?: any) => void }>({ page: { name: "loading" }, setCurrentPage: () => {} });

const routes = {
  start: <Start />,
  home: <Home />,
  loading: <Loading />,
  profile: <Profile />,
};

type RouteKeys = keyof typeof routes;

const App = () => {
  const { isTokenValid } = useAuth();
  const [renderedPage, setRenderedPage] = useState<{ name: RouteKeys, props?: any }>({ name: "loading", props: {} });

  const setCurrentPage = (name: RouteKeys, props: any = {}) => {
    setRenderedPage({ name, props });
  };


  useEffect(() => {
    if (isTokenValid === null) {
      setCurrentPage("loading");
    } else if (isTokenValid) {
      setCurrentPage("home");
    } else {
      setCurrentPage("start");
    }
  }, [isTokenValid]);

  return (
    <RouteContext.Provider value={{ page: renderedPage, setCurrentPage }}>
      <div className="p-4 bg-slate-800">
        {routes[renderedPage.name]}
      </div>
    </RouteContext.Provider>

  );
};

export default App;
