import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      api: path.resolve(__dirname, "src/api"),
      model: path.resolve(__dirname, "src/model"),
      dialogs: path.resolve(__dirname, "src/dialogs"),
      hooks: path.resolve(__dirname, "src/hooks"),
      components: path.resolve(__dirname, "src/components"),
    },
  },
});
