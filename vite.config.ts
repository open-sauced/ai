import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json" assert { type: "json" };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      crx({ manifest } as any),
      classnamePrefixer({ prefix: 'tw-' }),
  ],
});

function classnamePrefixer({ prefix }: { prefix: string }): Plugin {
    return {
        name: 'classname-prefixer',
        transform(code, id) {
              if (id.endsWith('.tsx')) {
                  code = code.replace(/className:\s*(['"`])(.*?)\1/g, (_, quote, styles: string) => {
                      const classNames = customSplit(styles
                        .trim())
                        .map((className) => {
                            if (className.startsWith("${") && className.endsWith("}")) {
                                let startQuote = null;
                                let startQuoteIndex = -1;
                                let updatedClassName = "";
                                let indexOfLastSplit: null | number = null;
                                for (let i = 0; i < className.length; i++) {
                                    if (!startQuote && (className[i] === "'" || className[i] === '"')) {
                                        startQuote = className[i];
                                        startQuoteIndex = i;
                                    } else if (startQuote && (className[i] === startQuote)) {
                                        const beforeStartStyles = className.slice(indexOfLastSplit ?? 0, startQuoteIndex + 1);
                                        const styles = className.slice(startQuoteIndex + 1, i);
                                        const prefixedStyles = styles.split(" ").map((style) => {
                                            if (style.length) {
                                                return prefix + style
                                            }
                                            return style;
                                        }).join(" ");
                                        updatedClassName += beforeStartStyles + prefixedStyles;
                                        indexOfLastSplit = i;
                                        startQuote = null;
                                        startQuoteIndex = -1;
                                    }
                                }
                                updatedClassName += className.slice(indexOfLastSplit ?? 0);
                                return updatedClassName;
                            }
                            else if (!className.includes(":")) {
                                if (className.length) {
                                    return prefix + className
                                }
                                return className;
                            }
                            const indexOfLastColon = className.lastIndexOf(":");
                            const pre = className.slice(0, indexOfLastColon + 1);
                            const style = className.slice(indexOfLastColon + 1);
                            return pre + prefix + style;
                        }).join(" ");
                      return `className: ${quote}${classNames}${quote}`;
                  });
              }
              return {
                  code,
                  map: null,
              };
        },
    };
}

function customSplit(str: string) {
    const result: string[] = [];
    let start = 0;
    for (let end = 0; end < str.length; end++) {
        if (str[start] === "$" && str[start + 1] === "{" && str[end - 1] === "}" && str[end] === " ") {
            result.push(str.slice(start, end + 1));
            start = end + 1;
        }
        else if (str[end] === " " && str[start] !== "$") {
            result.push(str.slice(start, end));
            start = end + 1;
        }
    }
    if (start < str.length)
    result.push(str.slice(start))
    return result;
}
