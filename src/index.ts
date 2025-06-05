import "reflect-metadata";

import cors from "cors";
import express, { Express } from "express";
import morgan from "morgan";

import { Modules } from "./modules";
import { env } from "./configs";
import { openAPIRouter } from "./swagger/openAPIRouter";

const app: Express = express();

app.use(express.json());

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use(morgan("combined"));

app.use("/book", Modules.bookRouter);
app.use(openAPIRouter);

// Error handlers
// app.use(errorHandler());

app.listen(env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = env;
  console.log(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});