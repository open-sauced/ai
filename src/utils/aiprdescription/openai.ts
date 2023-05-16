import type { DescriptionTone } from './descriptionconfig';
import { OpenAI, CreateChatCompletionRequest } from 'openai-streams';

const generatePrompt = (
    locale: string,
    maxLength: number,
    tone: DescriptionTone
) => [
    `Generate an apt github PR description written in present tense and ${tone} tone for the given code diff/commit-messages with the specifications mentioned below`,
    `Description language: ${locale}`,
    `Description must be a maximum of ${maxLength} characters.`,
    'Exclude anything unnecessary such as translation. Your entire response will be passed directly into a pull request description',
].join('\n');

const createChatCompletion = async (
    apiKey: string,
    json: CreateChatCompletionRequest,
): Promise<ReadableStream<Uint8Array>> => {
    const stream = await OpenAI("chat", json, {
        apiKey,
        mode: "tokens"
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
    commitMessages?: string[]
) => {

    const content = `${diff ? "Diff: " + diff + "\n" : ""}${commitMessages ? "\nCommit Messages: " + commitMessages.join(",") : ""}`;
    try {
        const completion = await createChatCompletion(
            apiKey,
            {
                model,
                messages: [
                    {
                        role: 'system',
                        content: generatePrompt(locale, maxLength, tone),
                    },
                    {
                        role: 'user',
                        content
                    },
                ],
                temperature,
                max_tokens: 600,
                stream: false,
                n: 1
            }
        );

        return completion;
    } catch (error: any) {
        alert(error);
    }
};