import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    base: "/Personal-portfolio/",
    plugins: [react()],
    // Explicitly define the global constant
    define: {
      'process.env': {}
    },
    // Make environment variables available to the client
    server: {
      port: 3000,
    },
    preview: {
      port: 3000,
    },
  };
});
