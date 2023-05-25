import { DescriptionSource } from "./aiprdescription/descriptionconfig";
import { isWithinTokenLimit } from "gpt-tokenizer";

type DescriptionContextPromise = Promise<[string | undefined, string[] | undefined]>;
type DescriptionContext = Awaited<DescriptionContextPromise>;

interface Commit {
  commit: {
    message: string;
  };
}

export const getPRDiff = async (url: string) => {
  const response = await fetch(
    url,
    { headers: { Accept: "application/vnd.github.v3.diff" } },
  );
  const diff = await response.text();

  return diff.replace(/.*/, "").substring(1);
};

export const getPRCommitMessages = async (url: string) => {
  const response = await fetch(url);
  const data = await response.json();

  if (!Array.isArray(data.commits)) {
    return undefined;
  }
  const commitMessages: string[] = (data.commits as Commit[]).map((commit: Commit): string => commit.commit.message);

  return commitMessages;
};

export const getDescriptionContext = async (url: string, source: DescriptionSource): DescriptionContextPromise => {
  let promises: [Promise<string | undefined>, Promise<string[] | undefined>] = [Promise.resolve(undefined), Promise.resolve(undefined)];

  if (source === "diff") {
    promises = [getPRDiff(url), Promise.resolve(undefined)];
  } else if (source === "commitMessage") {
    promises = [Promise.resolve(undefined), getPRCommitMessages(url)];
  } else {
    promises = [getPRDiff(url), getPRCommitMessages(url)];
  }
  const response = await Promise.all(promises);

  return response;
};

export const isOutOfContextBounds = (context: DescriptionContext, limit: number): boolean => {
  let text = "";

  if (context[0]) {
    text += context[0];
  }
  if (context[1]) {
    text += context[1].join("");
  }

  return isWithinTokenLimit(text, limit) === false;
};

export const isPublicRepository = async (url: string): Promise<boolean> => {
  try {
    const { username, repoName } = url.match(
      /^https?:\/\/(www\.)?github.com\/(?<username>[\w.-]+)\/?(?<repoName>[\w.-]+)?/,
    )?.groups ?? {};

    if (!username || !repoName) {
      return false;
    }
    const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const data = await response.json();

    return (response.status === 200 && data.private === false);
  } catch (e: unknown) {
    return false;
  }
};
