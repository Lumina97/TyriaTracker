import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite({}), react()],
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    host: true,
    port: 3001,
  },
});
