import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { optLogIn } from "../utils/checkAuthentication";

const Start = () => (
    <div className="p-4 bg-slate-800">
        <img
            alt="Open Sauced Logo"
            src={OpenSaucedLogo}
        />

        <p className="my-4 text-base font-bold text-white leading-5">
        Welcome to the
            {" "}

            <a
                className="text-orange no-underline"
                href="https://opensauced.pizza/"
            >
          OpenSauced
            </a>

            {" "}
        browser extension.
        </p>

        <button
            className="bg-orange no-underline border-none rounded-md text-white font-bold py-2 px-4 cursor-pointer
          bg-gradient-to-r from-[#e67e22] to-[#d35400]"
            onClick={optLogIn}
        >
        Login
        </button>
    </div>
);

export default Start;
