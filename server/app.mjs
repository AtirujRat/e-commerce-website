import express from "express";
import productRouter from "./route/products.mjs";

const app = express();
const port = 4000;

app.use(express.json());

app.use("/products", productRouter);

app.get("/test", (req, res) => {
  return res.json({ message: "OK" });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
});
