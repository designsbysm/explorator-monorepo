import cors from "cors";
import express from "express";
import { postgraphile } from "postgraphile";

import { databaseURL, serverPort } from "./config.mjs";

const app = express();

app.use(cors());

app.use(
  postgraphile(databaseURL, "public", {
    enhanceGraphiql: true,
    graphiql: true,
    watchPg: true,
  })
);

app.get("/api/hello", (_req, res) => {
  res.json({ message: "hello world" });
});

app.listen(serverPort, () => {
  console.log(`listening on :${serverPort}`);
});
