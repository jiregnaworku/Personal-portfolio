import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    base: "/Personal-portfolio/",
    plugins: [react()],
    // Make environment variables available to the client
    define: {
      'process.env': {}
    },
    // Expose environment variables that start with VITE_
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
  };
});
