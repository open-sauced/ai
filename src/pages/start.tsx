import OpenSaucedLogo from "../assets/opensauced-logo.svg";

interface StartProps {
  setRenderedPage: (page: string) => void;
}

function Start({ setRenderedPage }: StartProps) {
  return (
    <div>
      <img src={OpenSaucedLogo} alt="Open Sauced Logo" />
      <p className="my-4 text-base font-bold text-white leading-5">
        Welcome to the{" "}
        <a
          href="https://opensauced.pizza/"
          className="text-orange no-underline"
        >
          OpenSauced
        </a>{" "}
        browser extension.
      </p>
      <button
        className="bg-orange border-none rounded-md text-white font-bold py-2 px-4 cursor-pointer
          bg-gradient-to-r from-[#e67e22] to-[#d35400]"
        onClick={() => setRenderedPage("signin")}
      >
        Get Started
      </button>
    </div>
  );
}

export default Start;
