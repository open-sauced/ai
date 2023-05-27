type ColorScheme = "auto" | "light" | "dark";

export const prefersDarkMode = (cookieString: string): boolean => {
    const regex = /(?<=\bcolor_mode=)[^;]+/g;
    const match = regex.exec(cookieString);
    const cookie = match && JSON.parse(decodeURIComponent(match[0]));
    const colorScheme: ColorScheme = cookie.color_mode ?? "auto";

    if (colorScheme === "auto") {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return colorScheme === "dark";
};
