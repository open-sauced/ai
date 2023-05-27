import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx } from "@crxjs/vite-plugin";
import manifest from "./manifest.json" assert { type: "json" };

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
  define: {
    'config.version': JSON.stringify(process.env.npm_package_version),
}
});
