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
              if (id.endsWith('home.tsx')) {
                  code = code.replace(/className\s*:\s*("[^"]*")/g, (_, quote: string) => {
                      const classNames = quote
                        .slice(1, -1)
                        .split(' ')
                        .map((className) => {
                            if (!className.includes(":")) {
                                return prefix + className
                            }
                            const indexOfLastColon = className.lastIndexOf(":");
                            const pre = className.slice(0, indexOfLastColon + 1);
                            const style = className.slice(indexOfLastColon + 1);
                            return pre + prefix + style;
                        })
                        .join(' ');
                      return `className: "${classNames}"`;
                  });
                  console.log(code);
              }
              return {
                  code,
                  map: null,
              };
        },
    };
}
