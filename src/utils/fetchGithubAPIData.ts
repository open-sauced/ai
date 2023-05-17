import { DescriptionSource } from "./aiprdescription/descriptionconfig";

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
  if (!Array.isArray(data.commits)) return undefined;
  const commitMessages: string[] = data.commits.map((commit: Commit) => commit.commit.message);
  return commitMessages;
};

export const getDescriptionContext = async (url: string, source: DescriptionSource): DescriptionContextPromise => {
  let promises: [Promise<string | undefined>, Promise<string[] | undefined>] = [Promise.resolve(undefined), Promise.resolve(undefined)];
  
  if (source === "diff") promises = [getPRDiff(url), Promise.resolve(undefined)];
  else if (source === "commitMessage") promises = [Promise.resolve(undefined), getPRCommitMessages(url)];
  else promises = [getPRDiff(url), getPRCommitMessages(url)];
  const response = await Promise.all(promises);

  return response;
};

export const getDescriptionContextLength = ([diff, commitMessages]: DescriptionContext): number => {
  let length: number = 0;
  if (diff) length += diff.length;
  if (commitMessages) length += commitMessages.join("").length;
  return length;
}