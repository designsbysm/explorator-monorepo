import react from "@vitejs/plugin-react";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, path.resolve(__dirname, "../.."), ["PORT", "HOST"]);

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      allowedHosts: ["sm.ngrok.dev"],
      open: true,
      port: env.PORT_CLIENT,
      proxy: {
        "^/(api|graphql|graphiql)": {
          target: `http://${env.HOST_SERVER}`,
          changeOrigin: true,
        },
      },
    },
  };
});
