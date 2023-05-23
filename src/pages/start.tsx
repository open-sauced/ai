import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { SUPABASE_LOGIN_URL } from "../constants";

const Start = () => (
    <div>
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

      <a
        href={SUPABASE_LOGIN_URL}
        rel="noopener noreferrer"
        target="_blank"
        className="bg-orange no-underline border-none rounded-md text-white font-bold py-2 px-4 cursor-pointer
          bg-gradient-to-r from-[#e67e22] to-[#d35400]"
      >
        Login
      </a>
    </div>
  );

export default Start;
