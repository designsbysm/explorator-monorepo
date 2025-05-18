import cors from "cors";
import { config } from "dotenv";
import { expand } from "dotenv-expand";
import express from "express";
import { postgraphile } from "postgraphile";

expand(config());

const app = express();

const corsOptions = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(corsOptions));

app.use(
  postgraphile(process.env.DATABASE_URL, "public", {
    enhanceGraphiql: true,
    graphiql: true,
    watchPg: true,
  })
);

app.get("/", (_req, res) => {
  res.json({ message: "hello world" });
});

const port = process.env.PORT_SERVER || 3000;
app.listen(port, () => {
  console.log(`listening on :${port}`);
});
