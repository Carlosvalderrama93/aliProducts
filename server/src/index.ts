import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello, Express with TypeScript! and Nodemon");
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
