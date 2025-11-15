import react from "@vitejs/plugin-react";
import { config, parse } from "dotenv";
import { expand } from "dotenv-expand";
import path from "node:path";
import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const rootEnv = loadEnv(mode, path.resolve(__dirname, "../.."), [
    "PORT",
    "HOST",
  ]);

  expand(config({ path: "../../.env" }));
  const localEnv = expand(config({ path: "./.env", override: true })).parsed;

  const env = { ...rootEnv, ...localEnv };

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      allowedHosts: ["sm.ngrok.dev"],
      open: env.OPEN_BROWSER === "true",
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
