export const getGithubUsername = (url: string) => {
  const match = url.match(/github\.com\/([\w.-]+)/);

  return match && match[1];
};

export const getLinkedInUsername = (url: string) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/(?:#!\/)?@?([^\/\?\s]*)/,
  );

  return match ? match[1] : undefined;
};

export const getTwitterUsername = (url: string) => {
  const match = url.match(
    /(?:https?:\/\/)?(?:www\.)?twitter\.com\/(?:#!\/)?@?([^\/\?\s]*)/,
  );

  return match ? match[1] : undefined;
};
