import Toggle from "../components/ToggleSwitch";
import { useEffect, useState } from "react";

export type SettingsConfig = Record<string, boolean | undefined>;

const settingLabels: Record<string, string> = {
    codeRefactor: "AI Code Review",
};

const Settings = () => {
    const [settingsConfig, setSettingsConfig] = useState<SettingsConfig>({});

    useEffect(() => {
        const getSettingsDataFromStorage = async () => {
            const settingsConfig = await chrome.storage.sync.get(
                "osSettingsConfig",
            );

            if (settingsConfig.osSettingsConfig === undefined) {
                const defaultSettings = { codeRefactor: true };

                await chrome.storage.sync.set({
                    osSettingsConfig: defaultSettings,
                });
                setSettingsConfig(defaultSettings);
            } else {
                setSettingsConfig(settingsConfig.osSettingsConfig);
            }
        };

        void getSettingsDataFromStorage();
    }, []);

    return (
        <div className="p-4 bg-slate-800">
            <div className="grid grid-cols-1 divide-y divide-white/40 divider-y-center-2 min-w-[320px] text-white">
                <main className="main-content text-white">
                    <h3 className="text font-medium text-base leading-10">
                        Extension Settings:
                    </h3>
                    Coming Soon
                    <div className="flex flex-col gap-2" />
                </main>
            </div>
        </div>
    );
};

export default Settings;
