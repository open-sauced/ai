import { FaChevronLeft } from "react-icons/fa";
import OpenSaucedLogo from "../../assets/opensauced-logo.svg";
import { goBack } from "react-chrome-extension-router";
import Toggle from "../components/ToggleSwitch";
import { useEffect, useState } from "react";

interface SettingsConfig {
  aiPrDescription?: boolean;
}

const Settings = () => {
  const [settingsConfig, setSettingsConfig] = useState<SettingsConfig>({});

  useEffect(() => {
    const getSettingsDataFromStorage = async () => {
        const settingsConfig = await chrome.storage.sync.get("osSettingsConfig");

        console.log("sc", settingsConfig);
        if (settingsConfig.osSettingsConfig === undefined) {
            const defaultSettings = { aiPrDescription: false };

            await chrome.storage.sync.set({ osSettingsConfig: defaultSettings });
            setSettingsConfig(defaultSettings);
        } else {
            setSettingsConfig(settingsConfig.osSettingsConfig);
            console.log("whats passed", settingsConfig.osSettingsConfig.aiPrDescription);
        }
    };

    void getSettingsDataFromStorage();
  }, []);

  return (
  <div className="p-4 bg-slate-800">
    <div className="grid grid-cols-1 divide-y divide-white/40 divider-y-center-2 min-w-[320px] text-white">
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
      </header>

      <main className="main-content text-white">
        <h3 className="text font-medium text-base leading-10">Settings:</h3>

          { settingsConfig.aiPrDescription !== undefined &&
            <Toggle
              enabledSetting={settingsConfig.aiPrDescription}
              settingLabel="AI PR Description"
              settingName="aiPrDescription"
            />}

        <div className="flex flex-col gap-2" />
      </main>
    </div>
  </div>
  );
};

export default Settings;
