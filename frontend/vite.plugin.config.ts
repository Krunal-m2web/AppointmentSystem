import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

/**
 * Custom plugin to inject CSS directly into the JS bundle.
 * This eliminates the need for a separate CSS file request, preventing CORS/404 issues.
 */
const cssInjectedByJsPlugin = () => {
  return {
    name: "css-in-js-plugin",
    apply: "build" as "build",
    enforce: "post" as "post",
    generateBundle(options: any, bundle: any) {
      let cssCode = "";

      // 1. Find and extract all CSS
      for (const name in bundle) {
        if (name.endsWith(".css")) {
          cssCode += bundle[name].source;
          // Use delete operator to remove the file from output
          delete bundle[name];
        }
      }

      // 2. Inject CSS into the JS bundles
      if (cssCode) {
        for (const name in bundle) {
          if (
            name.endsWith(".js") &&
            (name.includes("iife") || name.includes("booking-widget"))
          ) {
            // Create a self-executing function to inject style
            // Use JSON.stringify for safe string escaping
            const injection = `(function(){try{var style=document.createElement('style');style.id='booking-widget-styles';style.innerText=${JSON.stringify(
              cssCode
            )};document.head.appendChild(style);}catch(e){console.error('Widget CSS injection failed',e);}})();`;

            // Prepend to the code
            bundle[name].code = injection + bundle[name].code;
          }
        }
      }
    },
  };
};

/**
 * Vite configuration for building the embeddable Booking Widget plugin.
 *
 * This config creates a self-contained bundle that can be embedded on any website.
 * Output formats:
 *   - IIFE: For direct <script> tag inclusion
 *   - ES: For modern module bundlers
 */
export default defineConfig({
  plugins: [react(), tailwindcss(), cssInjectedByJsPlugin()],
  define: {
    // Prevent React from being loaded in development mode in production builds
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // Radix UI aliases (same as main config)
      "vaul@1.1.2": "vaul",
      "sonner@2.0.3": "sonner",
      "react-day-picker@8.10.1": "react-day-picker",
      "lucide-react@0.487.0": "lucide-react",
      "@radix-ui/react-tooltip@1.1.8": "@radix-ui/react-tooltip",
      "@radix-ui/react-select@2.1.6": "@radix-ui/react-select",
      "@radix-ui/react-scroll-area@1.2.3": "@radix-ui/react-scroll-area",
      "@radix-ui/react-popover@1.1.6": "@radix-ui/react-popover",
      "@radix-ui/react-dialog@1.1.6": "@radix-ui/react-dialog",
      "@radix-ui/react-checkbox@1.1.4": "@radix-ui/react-checkbox",
    },
  },
  build: {
    lib: {
      // Entry point for the plugin
      entry: path.resolve(__dirname, "src/plugin.tsx"),
      // Global variable name for IIFE format
      name: "BookingWidget",
      // Output file naming
      formats: ["iife", "es"],
      fileName: (format) => {
        if (format === "iife") return "booking-widget.iife.js";
        return "booking-widget.js";
      },
    },
    rollupOptions: {
      // Bundle everything (React, dependencies) into a single file
      // This ensures the widget works standalone without requiring React on client sites
      output: {
        // Inline dynamic imports for a single bundle
        inlineDynamicImports: true,
      },
    },
    // Output directory
    outDir: "dist/plugin",
    // Generate source maps for debugging
    sourcemap: true,
    // Minify for production using esbuild (built-in, no extra dependency)
    minify: "esbuild",
    // CSS handling
    cssCodeSplit: true, // Allow split so our plugin can catch it. If false, it's emitted as style.css usually.
    // Target modern browsers
    target: "es2020",
  },
});
