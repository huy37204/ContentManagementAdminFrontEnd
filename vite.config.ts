import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Điều này cho phép truy cập từ bên ngoài
    port: 8081, // Port bạn muốn chạy
    watch: {
      usePolling: true,
    },
    strictPort: true, // Nếu 8082 bị chiếm, không tự động đổi port khác
    hmr: {
      host: "http://huytran3.workspace.opstech.org",
      port: 8081,
    },
  },
});
