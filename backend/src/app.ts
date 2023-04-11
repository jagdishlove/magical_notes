import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import noteRoutes from "./routes/notes";
import morgan from "morgan";

const app = express();

app.use(morgan("dev"));

app.use(express.json());
app.use("/api/notes", noteRoutes);

app.use((req, res, next) => {
  next(Error("End point now found"));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMEssage = "An unknown error occured";
  if (error instanceof Error) {
    errorMEssage = error.message;
    res.status(500).json({ error: errorMEssage });
  }
});

export default app;
