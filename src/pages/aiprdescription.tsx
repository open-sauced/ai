import React, { useContext, useEffect, useReducer, useState } from "react";
import { BiInfoCircle } from "react-icons/bi";
import { FaChevronLeft } from "react-icons/fa";
import OpenSaucedLogo from "../assets/opensauced-logo.svg";
import { RouteContext } from "../App";
import { ImSwitch } from "react-icons/im";
import toast, { Toaster } from 'react-hot-toast';

import {
  getAIDescriptionConfig,
  DescriptionTone,
  DescriptionSource,
  DescriptionLanguage,
  setAIDescriptionConfig,
  getDefaultDescriptionConfig,
} from "../utils/aiprdescription/descriptionconfig";
import { useRefs } from "../hooks/useRefs";
import { configurationReducer } from "../utils/aiprdescription/configurationReducer";

const AIPRDescription = () => {
  const { page, setCurrentPage } = useContext(RouteContext);
  const [config, dispatch] = useReducer(configurationReducer, getDefaultDescriptionConfig());
  const { refs, setRefFromKey } = useRefs();

  const tones: DescriptionTone[] = ["exciting", "persuasive", "informative", "humorous", "formal"];
  const sources: DescriptionSource[] = ["diff", "commitMessage", "both"];
  const languages: DescriptionLanguage[] = ["english", "spanish", "french", "german", "italian", "portuguese", "dutch", "russian", "chinese", "korean"];
  const [formDisabled, setFormDisabled] = useState<boolean>(true);


  useEffect(() => {
    const descriptionConfig = async () => {
      const configData = await getAIDescriptionConfig();
      dispatch({ type: "SET", value: configData });
      setFormDisabled(!configData?.enabled);
      console.log(config.config.openai_api_key);
    };
    descriptionConfig();
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();
    const openai_api_key = refs["openai_api_key"]!.getAttribute("value");
    const length = parseInt(refs["length"]?.getAttribute("value")!);
    const temperature = +((+refs["temperature"]?.getAttribute("value")! / 10).toFixed(1));
    const maxInputLength = parseInt(refs["maxInputLength"]?.getAttribute("value")!);
    const language = (refs["language"] as HTMLSelectElement).value as DescriptionLanguage;
    const source = (refs["source"] as HTMLSelectElement).value as DescriptionSource;
    const tone = (refs["tone"] as HTMLSelectElement).value as DescriptionTone;

    void setAIDescriptionConfig({
      enabled: true,
      config: {
        openai_api_key, length, temperature, maxInputLength, language, source, tone
      }
    });
    toast.success("Configuration updated!");

  }
  return (

    <><Toaster />
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
              const form = refs["form"] as HTMLFormElement;
              form.reset();
            }}
          >
            <ImSwitch />
          </button>
        </header>
        <main className="text-white">
          <form ref={setRefFromKey("form")} onSubmit={handleFormSubmit}>
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
                ref={setRefFromKey("openai_api_key")}
                value={config.config.openai_api_key!}
                onChange={(e) => dispatch({ type: "SET_OPENAI_API_KEY", value: e.currentTarget.value })}
              />
              <div className="grid grid-cols-2 -mx-4 mb-4 text-gray-300 text-sm">
                <div className="flex flex-col items-center justify-center">
                  <p>Description Length [<b>{config.config.length!}</b>]</p>
                  <input
                    id="length"
                    type="range"
                    name="length"
                    min="100"
                    value={config.config.length!}
                    onChange={(e) => dispatch({ type: "SET_LENGTH", value: parseInt(e.target.value) })}
                    max="600"
                    className="text-black p-1.5 rounded-md mb-1 w-half accent-orange"
                    ref={setRefFromKey("length")}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p>Temparature [<b>{config.config.temperature! / 10}</b>]</p>
                  <input
                    id="temparature"
                    type="range"
                    min="0"
                    max="10"
                    value={config.config.temperature!}
                    onChange={(e) => dispatch({ type: "SET_TEMPERATURE", value: parseInt(e.target.value) })}
                    name="length"
                    className="text-black p-1.5 rounded-md mb-2 w-half accent-orange"
                    ref={setRefFromKey("temperature")}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p>Max Input Length [<b>{config.config.maxInputLength!}</b>]</p>
                  <input
                    id="inputlength"
                    type="range"
                    min="0"
                    max="4000"
                    value={config.config.maxInputLength!}
                    onChange={(e) => dispatch({ type: "SET_MAX_INPUT_LENGTH", value: parseInt(e.target.value) })}
                    name="inputlength"
                    className="text-black p-1.5 rounded-md w-half accent-orange"
                    ref={setRefFromKey("maxInputLength")}
                  />
                </div>
                <div className="flex flex-col items-center justify-center">
                  <p>Description Language</p>
                  <select
                    name="descriptionlanguage"
                    id="descriptionlanguage"
                    className="text-black mt-2 p-1.5 rounded-md mb-2 w-[80%]"
                    ref={setRefFromKey("language")}
                    value={config.config.language!}
                    onChange={(e) => dispatch({ type: "SET_LANGUAGE", value: e.target.value })}
                  >
                    {languages.map((language) => {
                      return (
                        <option key={language} value={language}>
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
                    ref={setRefFromKey("tone")}
                    value={config.config.tone!}
                    onChange={(e) => dispatch({ type: "SET_TONE", value: e.target.value })}
                  >
                    {tones.map((tone) => {
                      return (
                        <option key={tone} value={tone}>
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
                    ref={setRefFromKey("source")}
                    value={config.config.source!}
                    onChange={(e) => dispatch({ type: "SET_SOURCE", value: e.target.value })}
                  >
                    {sources.map((source) => {
                      return (
                        <option key={source} value={source}>
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
    </>
  );
};

export default AIPRDescription;
