import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connect, ifDisconnect } from "./connectionDb.js";
import cookieParser from "cookie-parser";
// here all routes are importing
import TaskRouter from "./routes/TaskRoute.js";
import AuthRouter from "./routes/AuthRouter.js";
// here all routes are importing

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
dotenv.config();
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT || 8000;

ifDisconnect();

app.use(TaskRouter);
app.use("/auth", AuthRouter);

app.get("/cookie", (req, res) => {
  res.send(req.cookies.access_token);
});

// app.get("/", (req, res) => {
//   res.send("Welcome to the Task Management API");
// });

app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
  connect();
});
