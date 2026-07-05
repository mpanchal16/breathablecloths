// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import path from "path";
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import polyfillNode from "rollup-plugin-polyfill-node";

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
// Configure Vite to emit a single ESM server bundle at dist/server.js when doing an SSR build.
export default defineConfig(({ command, ssrBuild }) => ({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    // Add Node polyfills so packages that import node:stream / node:buffer / etc.
    // can build in the Worker/browser environment.
    plugins: [polyfillNode()],
    resolve: {
      alias: [
        // map node:stream imports to a browser-friendly stream implementation
        { find: "node:stream", replacement: "readable-stream" },
        // provide a small AsyncLocalStorage shim for node:async_hooks imports
        { find: "node:async_hooks", replacement: path.resolve(__dirname, "src/shims/async_hooks_shim.ts") }
      ],
    },
    build: ssrBuild
      ? {
          outDir: "dist",
          // When running the SSR build after the client build, don't wipe the client output
          emptyOutDir: false,
          rollupOptions: {
            input: "src/server.ts",
            output: {
              // Emit a single entry file named server.js so Wrangler can use it as main
              entryFileNames: "server.js",
              format: "es",
            },
          },
        }
      : undefined,
  },
}));
