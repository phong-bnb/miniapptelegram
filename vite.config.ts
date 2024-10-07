import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Thêm polyfill cho Buffer
      buffer: "buffer/",
    },
  },
  define: {
    "process.env": {}, // Thêm dòng này nếu cần
  },
});
