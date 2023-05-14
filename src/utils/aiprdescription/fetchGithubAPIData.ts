interface Commit {
  commit: {
    message: string;
  };
}

export const getPRCommitMessages = async (
  owner: string,
  repoName: string,
  pullNumber: number
) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repoName}/pulls/${pullNumber}/commits`
  );
  const data = await response.json();
  const commitMessages = data.map((commit: Commit) => commit.commit.message);
  return commitMessages;
};

export const getPRDiff = async (
  owner: string,
  repoName: string,
  pullNumber: number
) => {
  const response = await fetch(
    `https://api.github.com/repos/${owner}/${repoName}/pulls/${pullNumber}`,
    {
      headers: {
        Accept: "application/vnd.github.v3.diff",
      },
    }
  );
  const data = await response.text();
  return data;
};
