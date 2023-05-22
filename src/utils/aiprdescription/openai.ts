import type { DescriptionTone } from "./descriptionconfig";
import { OpenAI, CreateChatCompletionRequest } from "openai-streams";

const generatePRDescriptionPrompt = (
    locale: string,
    maxLength: number,
    tone: DescriptionTone,
) => [
    `Generate an apt github PR description written in present tense and ${tone} tone for the given code diff/commit-messages with the specifications mentioned below`,
    `Description language: ${locale}`,
    `Description must be a maximum of ${maxLength} characters.`,
    "Exclude anything unnecessary such as translation. Your entire response will be passed directly into a pull request description",
].join("\n");

const generateCodeSuggestionPrompt = (
    locale: string,
    maxLength: number,
) => [
    `Generate a code refactor suggestion for a given code snippet written in ${locale} with the specifications mentioned below`,
    `The code snippet must be a maximum of ${maxLength} characters.`,
    "Exclude anything unnecessary such as translation and instructions. The code snippet you suggest should start with \"```suggestion\" and end with ``` to create a valid GitHub suggestion codeblock. All non-code text or description should be outside of the codeblock.",
].join("\n");

const createChatCompletion = async (
    apiKey: string,
    json: CreateChatCompletionRequest,
): Promise<ReadableStream<Uint8Array>> => {
    const stream = await OpenAI("chat", json, {
        apiKey,
        mode: "tokens",
    });

    return stream;
};

export const generateDescription = async (
    apiKey: string,
    model: "gpt-3.5-turbo" | "gpt-3.5-turbo-0301",
    locale: string,
    maxLength: number,
    temperature: number,
    tone: DescriptionTone,
    diff?: string,
    commitMessages?: string[],
) => {
    const content = `${diff ? `Diff: ${diff}\n` : ""}${commitMessages ? `\nCommit Messages: ${commitMessages.join(",")}` : ""}`;

    try {
        const completion = await createChatCompletion(
            apiKey,
            {
                model,
                messages: [
                    {
                        role: "system",
                        content: generatePRDescriptionPrompt(locale, maxLength, tone),
                    },
                    {
                        role: "user",
                        content,
                    },
                ],
                temperature,
                n: 1,
            },
        );

        return completion;
    } catch (error: unknown) {
        if (error instanceof Error) {
 console.error("OpenAI error: ", error.message);
}
    }
};

export const generateCodeSuggestion = async (
    apiKey: string,
    model: "gpt-3.5-turbo" | "gpt-3.5-turbo-0301",
    locale: string,
    maxLength: number,
    temperature: number,
    code: string,
) => {
    const content = `Code: ${code}`;

    try {
        const completion = await createChatCompletion(
            apiKey,
            {
                model,
                messages: [
                    {
                        role: "system",
                        content: generateCodeSuggestionPrompt(locale, maxLength),
                    },
                    {
                        role: "user",
                        content,
                    },
                ],
                temperature,
                n: 1,
            },
        );

        return completion;
    } catch (error: unknown) {
        if (error instanceof Error) {
 console.error("OpenAI error: ", error.message);
}
    }
};
