import express, { Request, Response } from "express";



const app = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message:
      "Well Tour Management Api Ready For You 🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️🏃‍➡️",
  });
});

export default app;
