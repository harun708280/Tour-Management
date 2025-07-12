import express, { Request, Response } from "express";
import { userRoutes } from "./app/modules/user/user.route";

import cors from "cors"
import { router } from "./app/routes";

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

export default app;
