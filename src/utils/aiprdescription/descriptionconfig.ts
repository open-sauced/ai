import { AI_PR_DESCRIPTION_CONFIG_KEY } from "../../constants";

export type DescriptionTone = "exciting" | "persuasive" | "informative" | "humorous" | "formal";
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
  | "korean"

export interface DescriptionConfig {
  enabled: boolean;
  config: {
    openai_api_key: string | null;
    length: number | null;
    maxInputLength: number | null;
    temperature: number | null;
    language: DescriptionLanguage | null;
    tone: DescriptionTone | null;
    source: DescriptionSource | null;
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

export const setAIDescriptionConfig = async (data: DescriptionConfig): Promise<void> => {
  await chrome.storage.local.set({ [AI_PR_DESCRIPTION_CONFIG_KEY]: data });
}

export const getDefaultDescriptionConfig = (): DescriptionConfig => {
  return {
    enabled: false,
    config: {
      openai_api_key: null,
      length: 500,
      maxInputLength: 3000,
      temperature: 0.7,
      language: "english",
      tone: "informative",
      source: "diff"
    }
  }
};
export const setDefaultDescriptionConfig = async (): Promise<void> => {
  const defaultConfig = getDefaultDescriptionConfig();
  void setAIDescriptionConfig(defaultConfig);
}