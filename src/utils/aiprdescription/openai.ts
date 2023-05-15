import type { DescriptionTone } from './descriptionconfig';
import { Configuration, OpenAIApi, CreateChatCompletionRequest, CreateChatCompletionResponse } from 'openai';

const generatePrompt = (
    locale: string,
    maxLength: number,
    tone: DescriptionTone
) => [
    `Generate an apt, concise github PR description written in present tense and ${tone} tone for the given code diff/commit-messages with the specifications mentioned below`,
    `Description language: ${locale}`,
    `Description must be a maximum of ${maxLength} characters.`,
    'Exclude anything unnecessary such as translation. Your entire response will be passed directly into a pull request description',
].join('\n');

const createChatCompletion = async (
    apiKey: string,
    json: CreateChatCompletionRequest,
): Promise<CreateChatCompletionResponse | undefined> => {
    const configuration = new Configuration({ apiKey });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion(json);

    if (
        !response.status
        || response.status < 200
        || response.status > 299
    ) {
        let errorMessage = `OpenAI API Error: ${response.status} - ${response.statusText}`;

        if (response.status === 500) {
            errorMessage += '\n\nCheck the API status: https://status.openai.com';
        }

        alert(errorMessage);
    }

    else return response.data;
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

        if (completion) {
            return completion.choices[0].message?.content;
        }
    } catch (error: any) {
        alert(error);
    }
};