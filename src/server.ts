import { Server } from "http";
import app from "./app";
import config from "./config";

async function main() {
  const server: Server = app.listen(config.port, () => {
    console.log(`PH Health Care Server is Running on port ${config.port}`);
  });
}

main();
