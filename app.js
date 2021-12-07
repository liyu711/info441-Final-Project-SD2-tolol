import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import sessions from "express-session";
import { fileURLToPath } from "url";
import { dirname } from "path";

import indexRouter from "./routes/index.js";
import apiRouter from "./routes/api/v1/v1.js";

var app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1", apiRouter);

app.get("error", (req, res) => res.status(500).send("server error"));

export default app;
