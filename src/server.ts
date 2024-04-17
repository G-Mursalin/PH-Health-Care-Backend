import { Server } from "http";
import app from "./app";
import config from "./config";

async function main() {
  const server: Server = app.listen(config.port, () => {
    console.log(`PH Health Care Server is Running on port ${config.port}`);
  });

  // If server then closed the server
  const exitHandler = () => {
    if (server) {
      server.close(() => {
        console.info("Server closed");
      });
    }
    process.exit(1);
  };

  // Handle uncaughtException error
  process.on("uncaughtException", (error) => {
    console.log(error);
    exitHandler();
  });

  // Handle unhandledRejection error
  process.on("unhandledRejection", (error) => {
    console.log(error);
    exitHandler();
  });
}

main();
