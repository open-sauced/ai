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
  DescriptionLanguage
} from "../utils/aiprdescription/descriptionconfig";

const AIPRDescription = () => {
  const { page, setCurrentPage } = useContext(RouteContext);
  const [config, setConfig] = useState<DescriptionConfig | undefined>(
    undefined
  );
  const [length, setLength] = useState<number>(0);
  const [temparature, setTemparature] = useState<number>(0);
  const [maxInputLength, setMaxInputLength] = useState<number>(0);


  const tones: DescriptionTone[] = [
    "exciting",
    "persuasive",
    "informative",
    "humorous",
    "formal",
  ];
  const sources: DescriptionSource[] = ["diff", "commitMessage", "both"];
  const languages: DescriptionLanguage[] = ["english", "spanish", "french", "german", "italian", "portuguese", "dutch", "russian", "chinese", "korean"];
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
          className={`text-lg ${formDisabled ? "text-gray-400" : "text-orange"
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
                <p>Description Length [<b>{length}</b>]</p>
                <input
                  id="length"
                  type="range"
                  name="length"
                  min="100"
                  value={length}
                  onChange={(e) => setLength(parseInt(e.target.value))}
                  max="600"
                  className="text-black p-1.5 rounded-md mb-1 w-half accent-orange"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p>Temparature [<b>{temparature / 10}</b>]</p>
                <input
                  id="temparature"
                  type="range"
                  min="0"
                  max="10"
                  value={temparature}
                  onChange={(e) => setTemparature(parseInt(e.target.value))}
                  name="length"
                  className="text-black p-1.5 rounded-md mb-2 w-half accent-orange"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p>Max Input Length [<b>{maxInputLength}</b>]</p>
                <input
                  id="inputlength"
                  type="range"
                  min="0"
                  max="4000"
                  value={maxInputLength}
                  onChange={(e) => setMaxInputLength(parseInt(e.target.value))}
                  name="inputlength"
                  className="text-black p-1.5 rounded-md w-half accent-orange"
                />
              </div>
              <div className="flex flex-col items-center justify-center">
                <p>Description Language</p>
                <select
                  name="descriptionlanguage"
                  id="descriptionlanguage"
                  className="text-black mt-2 p-1.5 rounded-md mb-2 w-[80%]"
                >
                  {languages.map((language) => {
                    return (
                      <option value={language}>
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                      </option>
                    );
                  })}
                </select>
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
            <input type="submit" className="inline-block disabled:bg-gray-500 text-black bg-gh-white rounded-md p-2 text-sm font-semibold text-center select-none w-full border hover:shadow-button hover:no-underline" value="Save" />
          </fieldset>
        </form>
      </main>
    </div>
  );
};

export default AIPRDescription;
