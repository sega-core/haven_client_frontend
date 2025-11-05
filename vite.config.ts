import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
import { visualizer } from "rollup-plugin-visualizer";

import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(), svgr(), tailwindcss(), visualizer({
      filename: "./dist/stats.html",
      open: true,
      gzipSize: true,
      brotliSize: true
    })
  ],
})