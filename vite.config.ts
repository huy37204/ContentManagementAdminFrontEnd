import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    host: true,
    port: 8081,
    watch: {
      usePolling: true,
    },
    strictPort: true,
    hmr: {
      host: "huytran3.workspace.opstech.org",
      port: 8081,
    },
  },
});
