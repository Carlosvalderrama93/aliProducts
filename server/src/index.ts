import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import type { ProductType } from "./feat/types.ts";
import { nanoid } from "nanoid";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/api", (req: Request, res: Response) => {
  res.send("Hello, from Express with TypeScript");
});

app.post("/api/product", async (req: Request, res: Response) => {
  const products: ProductType[] = [];
  const product: ProductType = { ...req.body, id: nanoid() };
  products.push(product);
  const productsJson = JSON.stringify(products, null, 2);
  const pathFs =
    "/home/carlos/Documents/Development/FullStack/aliProducts/server/src/data.json";
  fs.writeFile(pathFs, productsJson, (err) => {
    if (err) {
      console.error("Error writing to file:", err);
      res.status(500).send("Error writing to file");
    } else {
      console.log("ProductsJson is: ", productsJson);
      res.send(product);
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
