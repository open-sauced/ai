import { useEffect, useState } from "react";

const Toggle = ({ settingName, settingLabel, enabledSetting }: { settingName: string; enabledSetting: boolean; settingLabel: string }) => {
    const [enabled, setEnabled] = useState(enabledSetting);

    const changeSetting = async (value: boolean) => {
        const settingsConfig = await chrome.storage.sync.get("osSettingsConfig");

        if (settingsConfig.osSettingsConfig === undefined) {
            const defaultSettings = { aiPrDescription: false };

            await chrome.storage.sync.set({ osSettingsConfig: defaultSettings });
        }

        const newSettingsConfig = { ...settingsConfig.osSettingsConfig, [settingName]: value };

        await chrome.storage.sync.set({ osSettingsConfig: newSettingsConfig });

        setEnabled(value);
    };

    return (
        <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-400">
                {settingLabel}
            </span>

            <label className="inline-flex relative items-center mr-5 cursor-pointer">
                <input
                    readOnly
                    checked={enabled}
                    className="sr-only peer"
                    type="checkbox"
                />

                <div
                    aria-checked="false"
                    className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                    role="checkbox"
                    tabIndex={0}
                    onClick={ async () => {
                        enabled ? await changeSetting(false) : await changeSetting(true);
                    }}
                    onKeyDown={ async e => {
                        if (e.key === "Enter") {
                            enabled ? await changeSetting(false) : await changeSetting(true);
                        }
                    }}
                />
            </label>
        </div>
    );
};

export default Toggle;
