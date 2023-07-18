import { useEffect } from "react";
import Start from "./popup/pages/start";
import Home from "./popup/pages/home";
import { useAuth } from "./hooks/useAuth";
import { goTo } from "react-chrome-extension-router";

const App = () => {
    const { isTokenValid } = useAuth();

    useEffect(() => {
        if (isTokenValid) {
            goTo(Home);
        }
    }, [isTokenValid]);

    return <Start />;
};

export default App;
