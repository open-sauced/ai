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
  const commitMessages: string[] = data.commits.map((commit: Commit) => commit.commit.message );

  return commitMessages;
};
