import { AI_PR_DESCRIPTION_CONFIG_KEY } from "../../constants";

export type DescriptionTone = "exciting" | "persuasive" | "informative" | "humorous" | "formal";
export type DescriptionSource = "diff" | "commitMessage" | "both";
export interface DescriptionConfig {
  enabled: boolean;
  config: {
    openai_api_key: string | null;
    length: number;
    temperature: number;
    language: string;
    tone: DescriptionTone;
    source: DescriptionSource;
  };
  [key: string]: any;
}

export const getAIDescriptionConfig = async (): Promise<
  DescriptionConfig | undefined
> => {
  const response: DescriptionConfig | undefined = (
    await chrome.storage.sync.get(AI_PR_DESCRIPTION_CONFIG_KEY)
  )[AI_PR_DESCRIPTION_CONFIG_KEY];
  return response;
};
