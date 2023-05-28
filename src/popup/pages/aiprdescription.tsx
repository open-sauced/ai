import React, { useEffect, useReducer, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import OpenSaucedLogo from "../../assets/opensauced-logo.svg";
import { ImSwitch } from "react-icons/im";
import toast, { Toaster } from "react-hot-toast";

import {
    getAIDescriptionConfig,
    DescriptionTone,
    DescriptionSource,
    DescriptionLanguage,
    setAIDescriptionConfig,
    getDefaultDescriptionConfig,
    toggleAIPRDescriptionEnabled,
} from "../../utils/aiprdescription/descriptionconfig";
import { useRefs } from "../../hooks/useRefs";
import { configurationReducer } from "../../utils/aiprdescription/configurationReducer";
import { goBack } from "react-chrome-extension-router";

const AIPRDescription = () => {
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
        };

        void descriptionConfig();
    }, []);

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const length = parseInt(refs.length?.getAttribute("value") ?? "0");
        const temperature = Number(Number(refs.temperature?.getAttribute("value") ?? "0"));
        const maxInputLength = parseInt(refs.maxInputLength?.getAttribute("value") ?? "0");
        const language = (refs.language as HTMLSelectElement).value as DescriptionLanguage;
        const source = (refs.source as HTMLSelectElement).value as DescriptionSource;
        const tone = (refs.tone as HTMLSelectElement).value as DescriptionTone;

        void setAIDescriptionConfig({
            enabled: true,
            config: { length, temperature, maxInputLength, language, source, tone },
        });
        toast.success("Configuration updated!");
    };

    return (

        <>
            <Toaster />

            <div className="p-4 bg-slate-800">
                <div className="grid grid-cols-1 divide-y divider-y-center-2 min-w-[320px]">
                    <header className="flex justify-between">
                        <div className="flex items-center gap-2">
                            <button
                                className="rounded-full p-2 bg-slate-700 hover:bg-slate-700/50"
                                onClick={() => {
                                    goBack();
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
                            title="Toggle AI PR Description"
                            className={`text-lg ${formDisabled ? "text-gray-400" : "text-orange"
                            }`}
                            onClick={() => {
                                setFormDisabled(!formDisabled);
                                dispatch({ type: "TOGGLE_ENABLED", value: config });
                                void toggleAIPRDescriptionEnabled();
                                if (formDisabled) {
                                    toast.success("AI PR Description enabled!");
                                } else {
                                    toast.error("AI PR Description disabled!");
                                }
                            }}
                        >
                            <ImSwitch />
                        </button>
                    </header>

                    <main className="text-white">
                        <form
                            ref={setRefFromKey("form")}
                            onSubmit={handleFormSubmit}
                        >
                            <fieldset disabled={formDisabled}>
                                <h1 className="text-2xl text-white font-bold my-2">
                OpenSauced AI
                                </h1>

                                <div className="grid grid-cols-2 -mx-4 mb-4 text-gray-300 text-sm">
                                    <div className="flex flex-col items-center justify-center">
                                        <p>
                    Description Length [
                                            <b>
                                                {config.config.length}
                                            </b>
                    ]
                                        </p>

                                        <input
                                            ref={setRefFromKey("length")}
                                            className="text-black p-1.5 rounded-md mb-1 w-half accent-orange"
                                            id="length"
                                            max="500"
                                            min="100"
                                            name="length"
                                            type="range"
                                            value={config.config.length}
                                            onChange={e => dispatch({ type: "SET_LENGTH", value: parseInt(e.target.value) })}
                                        />
                                    </div>

                                    <div className="flex flex-col items-center justify-center">
                                        <p>
                    Temperature [
                                            <b>
                                                {config.config.temperature / 10}
                                            </b>
                    ]
                                        </p>

                                        <input
                                            ref={setRefFromKey("temperature")}
                                            className="text-black p-1.5 rounded-md mb-2 w-half accent-orange"
                                            id="temparature"
                                            max="10"
                                            min="0"
                                            name="length"
                                            type="range"
                                            value={config.config.temperature}
                                            onChange={e => dispatch({ type: "SET_TEMPERATURE", value: parseInt(e.target.value) })}
                                        />
                                    </div>

                                    <div className="flex flex-col items-center justify-center">
                                        <p>
                    Max Input Length [
                                            <b>
                                                {config.config.maxInputLength}
                                            </b>
                    ]
                                        </p>

                                        <input
                                            ref={setRefFromKey("maxInputLength")}
                                            className="text-black p-1.5 rounded-md w-half accent-orange"
                                            id="inputlength"
                                            max="3900"
                                            min="200"
                                            name="inputlength"
                                            type="range"
                                            value={config.config.maxInputLength}
                                            onChange={e => dispatch({ type: "SET_MAX_INPUT_LENGTH", value: parseInt(e.target.value) })}
                                        />
                                    </div>

                                    <div className="flex flex-col items-center justify-center">
                                        <p>Description Language</p>

                                        <select
                                            ref={setRefFromKey("language")}
                                            className="text-black mt-2 p-1.5 rounded-md mb-2 w-[80%]"
                                            id="descriptionlanguage"
                                            name="descriptionlanguage"
                                            value={config.config.language}
                                            onChange={e => dispatch({ type: "SET_LANGUAGE", value: e.target.value })}
                                        >
                                            {languages.map(language => (
                                                <option
                                                    key={language}
                                                    value={language}
                                                >
                                                    {language.charAt(0).toUpperCase() + language.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col items-center justify-center">
                                        <p>Description Tone</p>

                                        <select
                                            ref={setRefFromKey("tone")}
                                            className="text-black mt-2 p-1.5 rounded-md mb-2 w-[80%]"
                                            id="tone"
                                            name="tone"
                                            value={config.config.tone}
                                            onChange={e => dispatch({ type: "SET_TONE", value: e.target.value })}
                                        >
                                            {tones.map(tone => (
                                                <option
                                                    key={tone}
                                                    value={tone}
                                                >
                                                    {tone.charAt(0).toUpperCase() + tone.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className="flex flex-col items-center justify-center">
                                        <p>Description Source</p>

                                        <select
                                            ref={setRefFromKey("source")}
                                            className="text-black mt-2 p-1.5 rounded-md mb-2 w-[80%]"
                                            id="source"
                                            name="source"
                                            value={config.config.source}
                                            onChange={e => dispatch({ type: "SET_SOURCE", value: e.target.value })}
                                        >
                                            {sources.map(source => (
                                                <option
                                                    key={source}
                                                    value={source}
                                                >
                                                    {source.charAt(0).toUpperCase() + source.slice(1)}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <input
                                    className="inline-block disabled:bg-gray-500 text-black bg-gh-white rounded-md p-2 text-sm font-semibold text-center select-none w-full border hover:shadow-button hover:no-underline"
                                    type="submit"
                                    value="Save"
                                />
                            </fieldset>
                        </form>
                    </main>
                </div>
            </div>
        </>
    );
};

export default AIPRDescription;
