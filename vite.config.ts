import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), svgr(), tailwindcss()],

  build: {
    minify: "esbuild",
    sourcemap: false,
    chunkSizeWarningLimit: 300,

    rollupOptions: {
      maxParallelFileOps: 1,

      output: {
        manualChunks: {
          "react-vendor": [
            "react",
            "react-dom",
            "react-router",
            "react-router-dom",
          ],

          "tma-vendor": ["@tma.js/sdk", "@tma.js/sdk-react"],

          "heroui-core": [
            "@heroui/button",
            "@heroui/tabs",
            "@heroui/theme",
          ],

          "data-vendor": ["@tanstack/react-query", "axios", "date-fns"],

          "forms-vendor": ["final-form", "react-final-form"],

          "animation-vendor": ["framer-motion"],

          "utils-vendor": ["vaul", "react-circular-progressbar"],
        },
      },
    },

    // Отключаем ненужные опции
    reportCompressedSize: false,
    emptyOutDir: true,
  },

  // Оптимизация зависимостей
  optimizeDeps: {
    force: true,
  },
});
