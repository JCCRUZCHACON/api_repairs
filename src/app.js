import express from "express";
import { router } from "./routes/route.js"
import { globalErrorHandler } from "./errors/error.controller.js";
import { AppError } from "./errors/appError.js";

const app = express();

app.use(express.json())


app.use("/api/v1", router)

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404))
  })
  
  app.use(globalErrorHandler)

export default app;

