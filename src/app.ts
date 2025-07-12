import express, { Request, Response } from "express";
import { userRoutes } from "./app/modules/user/user.route";

import cors from "cors"
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middleware/globalErrorHandle";
import httpStatus  from 'http-status-codes';
import { success } from "zod";
import NotFound from "./app/middleware/notFound";

const app = express();
app.use(express.json())
app.use(cors())
app.use("/api/v1/",router)

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message:
      "Well Tour Management Api Ready For You 🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️",
  });
});

app.use(globalErrorHandler)
app.use(NotFound)
export default app;
