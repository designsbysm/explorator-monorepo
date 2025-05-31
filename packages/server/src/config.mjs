import { config } from "dotenv";
import { expand } from "dotenv-expand";

expand(config({ path: "../../.env" }));

const databaseURL = process.env.DATABASE_URL;
const serverPort = process.env.PORT_SERVER;

export { databaseURL, serverPort };
