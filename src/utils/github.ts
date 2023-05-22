const generateGhOgImage = (githubUrl: string): { isValid: boolean; url: string } => {
    try {
      const trimmedUrl = githubUrl.trim();
      const url = new URL(trimmedUrl.includes("https://") ? trimmedUrl : `https://${trimmedUrl}`);
      const { pathname } = url;

      if (url.hostname !== "github.com") {
        return { isValid: false, url: "" };
      }

      return { isValid: true, url: `https://opengraph.githubassets.com/1${pathname}` };
    } catch (err) {
      return { isValid: false, url: "" };
    }
  };

  export { generateGhOgImage };
