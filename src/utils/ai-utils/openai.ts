import {
    OPEN_SAUCED_AI_PR_DESCRIPTION_ENDPOINT,
    OPEN_SAUCED_AI_CODE_REFACTOR_ENDPOINT,
    OPEN_SAUCED_AI_CODE_TEST_ENDPOINT,
    OPEN_SAUCED_AI_CODE_EXPLANATION_ENDPOINT,
} from "../../constants";
import type { DescriptionConfig, DescriptionTone } from "./descriptionconfig";

export const generateDescription = async (
    apiKey: string,
    language: string,
    descriptionLength: number,
    temperature: number,
    tone: DescriptionTone,
    diff?: string,
    commitMessages?: string[],
): Promise<string | undefined> => {
    try {
        const response = await fetch(OPEN_SAUCED_AI_PR_DESCRIPTION_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                descriptionLength,
                temperature,
                tone,
                language,
                diff,
                commitMessages,
            }),
        });

        if (response.status === 201) {
            const { description } = await response.json();

            return description;
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("OpenAI error: ", error.message);
        }
    }
    return undefined;
};

export const generateCodeSuggestion = async (
    apiKey: string,
    code: string,
    { config: { length, temperature, language } }: DescriptionConfig,
): Promise<string | undefined> => {
    try {
        const response = await fetch(OPEN_SAUCED_AI_CODE_REFACTOR_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                descriptionLength: length,
                temperature,
                language,
                code,
            }),
        });

        if (response.status === 201) {
            const { suggestion } = await response.json();

            return suggestion;
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("OpenAI error: ", error.message);
        }
    }
    return undefined;
};

export const generateCodeTest = async (
    apiKey: string,
    code: string,
    { config: { length, temperature } }: DescriptionConfig,
): Promise<string | undefined> => {
    try {
        const response = await fetch(OPEN_SAUCED_AI_CODE_TEST_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                descriptionLength: length,
                temperature,
                code,
            }),
        });

        if (response.status === 201) {
            const { suggestion } = await response.json();

            return suggestion;
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("OpenAI error: ", error.message);
        }
    }
    return undefined;
};

export const generateCodeExplanation = async (
    apiKey: string,
    code: string,
    { config: { length, temperature, language } }: DescriptionConfig,
): Promise<string | undefined> => {
    try {
        const response = await fetch(OPEN_SAUCED_AI_CODE_EXPLANATION_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                descriptionLength: length,
                temperature,
                language,
                code,
            }),
        });

        if (response.status === 201) {
            const { suggestion } = await response.json();

            return suggestion;
        }
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error("OpenAI error: ", error.message);
        }
    }
    return undefined;
};
