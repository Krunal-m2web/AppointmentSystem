import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Function to map standard npm packages to WordPress globals
const wpGlobals = {
  react: "React",
  "react-dom": "ReactDOM",
  "@wordpress/blocks": "wp.blocks",
  "@wordpress/block-editor": "wp.blockEditor",
  "@wordpress/components": "wp.components",
  "@wordpress/i18n": "wp.i18n",
  "@wordpress/element": "wp.element",
  "@wordpress/editor": "wp.editor",
  "@wordpress/data": "wp.data",
};

export default defineConfig({
  plugins: [react()],
  build: {
    // Output directly to the plugin assets folder
    outDir: "../backend/wwwroot/plugins/mybooking-plugin/assets",
    emptyOutDir: true,
    lib: {
      entry: path.resolve(__dirname, "src/wp-plugin/index.tsx"),
      name: "MyBookingBlocks",
      formats: ["iife"], // WP uses global scripts often, or valid ES. IIFE with globals is safest for legacy WP.
      fileName: () => "mybooking-blocks.js",
    },
    rollupOptions: {
      // Make sure external dependencies are not bundled
      external: Object.keys(wpGlobals),
      output: {
        // Map external dependencies to global variables
        globals: wpGlobals,
        // Ensure styling is emitted if needed, though we might rely on the main widget CSS
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") return "mybooking-blocks.css";
          return assetInfo.name as string;
        },
      },
    },
    // Minify for production
    minify: "esbuild",
  },
  define: {
    "process.env.NODE_ENV": '"production"',
  },
});
