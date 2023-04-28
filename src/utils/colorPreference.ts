export type ColorScheme = "auto" | "light" | "dark";

export const getGHColorScheme = (cookieString: string) => {
  const regex = /(?<=\bcolor_mode=)[^;]+/g;
  const match = regex.exec(cookieString);
  const cookie = match && JSON.parse(decodeURIComponent(match[0]));
  return (cookie.color_mode as ColorScheme) || "auto";
};

export const prefersDarkMode = (colorScheme: ColorScheme): boolean => {
  if (colorScheme === "auto") {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return colorScheme === "dark";
};
