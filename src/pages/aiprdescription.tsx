import { useContext, useEffect, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { FaChevronLeft } from "react-icons/fa";
import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { RouteContext } from "../App";
import { ImSwitch } from "react-icons/im";
import {
  getAIDescriptionConfig,
  DescriptionConfig,
  DescriptionTone,
  DescriptionSource,
} from "../utils/aiprdescription/descriptionconfig";

const AIPRDescription = () => {
  const { page, setCurrentPage } = useContext(RouteContext);
  const [config, setConfig] = useState<DescriptionConfig | undefined>(
    undefined
  );
  const tones: DescriptionTone[] = [
    "exciting",
    "persuasive",
    "informative",
    "humorous",
    "formal",
  ];
  const sources: DescriptionSource[] = ["diff", "commitMessage", "both"];
  const [formDisabled, setFormDisabled] = useState<boolean>(true);

  useEffect(() => {
    const descriptionConfig = async () => {
      const configData = await getAIDescriptionConfig();
    };
    descriptionConfig();
  }, []);

  return (
    <div className="grid grid-cols-1 divide-y divider-y-center-2 min-w-[320px]">
      <header className="flex justify-between">
        <div className="flex items-center gap-2">
          <button
            className="rounded-full p-2 bg-slate-700 hover:bg-slate-700/50"
            onClick={() => {
              setCurrentPage("home");
            }}
          >
            <FaChevronLeft className="text-osOrange text-white" />
          </button>

          <img
            alt="OpenSauced logo"
            className="w-[100%]"
            src={OpenSaucedLogo}
          />
        </div>

        <button
          className={`text-lg ${
            formDisabled ? "text-gray-400" : "text-orange"
          }`}
          title="Toggle AI PR Description"
          onClick={async () => {
            setFormDisabled(!formDisabled);
          }}
        >
          <ImSwitch />
        </button>
      </header>
      <main className="text-white">
        <form action="">
          <fieldset disabled={formDisabled}>
            <h1 className="text-2xl text-white font-bold my-2">
              AI PR Description
            </h1>
            <p className="mb-2 text-gray-300 text-sm">
              OpenAI API Key
              <BiInfoCircle
                title="Find your API key here"
                className="inline-block ml-1 text-gray-400 align-middle cursor-pointer"
                onClick={() =>
                  window.open(
                    "https://platform.openai.com/account/api-keys",
                    "_blank"
                  )
                }
              />
            </p>
            <input
              type="password"
              className="p-1.5 rounded-md mb-2 w-full text-black"
            />
            <div className="grid grid-cols-2 -mx-4 mb-4 text-gray-300 text-sm">
              <div className="flex flex-col items-center justify-center">
                <p>Description Length</p>
                <input
                  id="length"
                  type="range"
                  name="length"
                  min="100"
                  value="500"
                  max="600"
                  className="text-black p-1.5 rounded-md mb-1 w-half accent-orange"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p>Temparature</p>
                <input
                  id="temparature"
                  type="range"
                  min="1"
                  max="10"
                  value="7"
                  name="length"
                  className="text-black p-1.5 rounded-md mb-2 w-half accent-orange"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p>Description Tone</p>
                <select
                  name="tone"
                  id="tone"
                  className="text-black mt-2 p-1.5 rounded-md mb-2 w-[80%]"
                >
                  {tones.map((tone) => {
                    return (
                      <option value={tone}>
                        {tone.charAt(0).toUpperCase() + tone.slice(1)}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="flex flex-col items-center justify-center">
                <p>Description Source</p>
                <select
                  name="source"
                  id="source"
                  className="text-black mt-2 p-1.5 rounded-md mb-2 w-[80%]"
                >
                  {sources.map((source) => {
                    return (
                      <option value={source}>
                        {source.charAt(0).toUpperCase() + source.slice(1)}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default AIPRDescription;
