import cors from "cors";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import express from "express";
import { postgraphile } from "postgraphile";

expand(config());

const app = express();

app.use(cors());

app.use(
  postgraphile(process.env.DATABASE_URL, "public", {
    enhanceGraphiql: true,
    graphiql: true,
    watchPg: true,
  })
);

app.get("/api/", (_req, res) => {
  res.json({ message: "hello world" });
});

const port = process.env.PORT_SERVER || 3000;
app.listen(port, () => {
  console.log(`listening on :${port}`);
});
