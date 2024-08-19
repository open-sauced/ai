import { AI_PR_DESCRIPTION_CONFIG_KEY } from "../../constants";

export type DescriptionTone =
    | "exciting"
    | "persuasive"
    | "informative"
    | "humorous"
    | "formal";
export type DescriptionSource = "diff" | "commitMessage" | "both";
export type DescriptionLanguage =
    | "english"
    | "spanish"
    | "french"
    | "german"
    | "italian"
    | "portuguese"
    | "dutch"
    | "russian"
    | "chinese"
    | "korean";

export interface DescriptionConfig {
    config: {
        length: number;
        maxInputLength: number;
        temperature: number;
        language: DescriptionLanguage;
        tone: DescriptionTone;
        source: DescriptionSource;
    };
    [key: string]: any;
}

export const getAIDescriptionConfig = async (): Promise<
    DescriptionConfig | undefined
> => {
    const response: DescriptionConfig | undefined = (
        await chrome.storage.local.get(AI_PR_DESCRIPTION_CONFIG_KEY)
    )[AI_PR_DESCRIPTION_CONFIG_KEY];

    return response;
};

export const setAIDescriptionConfig = async (
    data: DescriptionConfig,
): Promise<void> => {
    await chrome.storage.local.set({ [AI_PR_DESCRIPTION_CONFIG_KEY]: data });
};

export const getDefaultDescriptionConfig = (): DescriptionConfig => ({
    config: {
        length: 500,
        maxInputLength: 3900,
        temperature: 7,
        language: "english",
        tone: "formal",
        source: "diff",
    },
});

export const setDefaultDescriptionConfig = () => {
    const defaultConfig = getDefaultDescriptionConfig();

    void setAIDescriptionConfig(defaultConfig);
};
