import React from "react";
import { checkTokenValidity } from "../utils/fetchOpenSaucedApiData";
import { BiArrowBack, BiInfoCircle } from "react-icons/bi";

interface SignInProps {
  setRenderedPage: (page: string) => void;
}

function SignIn({ setRenderedPage }: SignInProps) {
  const [token, setToken] = React.useState("");

  const authenticateUser = (token: string) => {
    if (token === "") {
      alert("Please enter a valid token");
      return;
    }
    checkTokenValidity(token)
      .then((valid) => {
        if (valid) {
          chrome.storage.sync.set({ "os-access-token": token }, () => {
            setRenderedPage("home");
          });
        } else {
          alert("Token is invalid");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("An error occurred while authenticating");
      });
  };

  return (
    <div>
      <BiArrowBack
        className="text-orange cursor-pointer text-2xl"
        onClick={() => setRenderedPage("start")}
      />
      <h1 className="text-white text-2xl font-bold my-2">Sign In</h1>
      <p className="mb-2 text-gray-300 text-sm">
        Enter your Personal Access Token to sign in.
        <BiInfoCircle
          title="Learn how to obtain a Personal Access Token"
          className="inline-block ml-1 text-gray-400 align-middle cursor-pointer"
          onClick={() =>
            window.open(
              "https://docs.opensauced.pizza/contributing/set-up-authentication/",
              "_blank"
            )
          }
        />
      </p>
      <input
        type="text"
        className="p-1.5 rounded-md mb-2 outline-none"
        onChange={(e) => setToken(e.target.value)}
      />
      <button
        className="bg-orange border-none rounded-md text-white font-bold py-2 px-4 cursor-pointer
          bg-gradient-to-r from-[#e67e22] to-[#d35400] mt-2"
        onClick={() => authenticateUser(token)}
      >
        Sign In
      </button>
    </div>
  );
}

export default SignIn;
