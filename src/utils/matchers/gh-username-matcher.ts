export const getGithubUsername = (url: string) => {
  const match = url.match(/github\.com\/([^/]+)/);
  return match && match[1];
};
