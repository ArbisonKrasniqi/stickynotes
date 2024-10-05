import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path';  // Add this to resolve paths

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [react()],

  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  clearScreen: false,

  // 2. Tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      ignored: ['**/src-tauri/**'],
    },
  },

  // Ensure correct paths and output directory for production builds
  base: './',  // Set relative base for production builds
  build: {
    outDir: resolve(__dirname, 'dist'),  // Ensure the correct build output folder
    emptyOutDir: true,  // Cleans the directory before building
  },
}));
