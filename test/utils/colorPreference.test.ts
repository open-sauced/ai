import { describe, it, expect, vi } from "vitest";
import { prefersDarkMode } from "../../src/utils/colorPreference";

Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: query === "(prefers-color-scheme: dark)",
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

describe("checkColorPreference", () => {
  it('should return true when the color_mode is set to "dark"', () => {
    const cookieString =
      "tz=Asia%2FCalcutta; color_mode=%7B%22color_mode%22%3A%22dark%22%7D";
    const expected = true;
    const actual = prefersDarkMode(cookieString);
    expect(actual).toEqual(expected);
  });

  it('should return false when the color_mode is set to "light"', () => {
    const cookieString = "color_mode=%7B%22color_mode%22%3A%22light%22%7D";

    const expected = false;
    const actual = prefersDarkMode(cookieString);
    expect(actual).toEqual(expected);
  });

  it('should return true when the color_mode is set to "auto` and prefers-color-scheme is "dark"', () => {
    const cookieString =
      "color_mode=%7B%22color_mode%22%3A%22auto%22%7D;tz=Asia%2FCalcutta";

    const expected = true;
    const actual = prefersDarkMode(cookieString);
    expect(actual).toEqual(expected);
  });
});
