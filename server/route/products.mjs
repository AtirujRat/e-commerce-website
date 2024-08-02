import connectionPool from "../utils/db.mjs";
import { validationCreateProduct } from "../middleware/products.validation.mjs";
import { Router } from "express";

const productRouter = Router();

productRouter.post("/", [validationCreateProduct], async (req, res) => {
  const newProduct = {
    ...req.body,
    created_at: new Date(),
    updated_at: new Date(),
  };

  try {
    await connectionPool.query(
      `
      insert into products (name,description,price,url,category,created_at,updated_at)
      values ($1,$2,$3,$4,$5,$6,$7)
      `,
      [
        newProduct.name,
        newProduct.description,
        newProduct.price,
        newProduct.url,
        newProduct.category,
        newProduct.created_at,
        newProduct.updated_at,
      ]
    );
  } catch {
    return res
      .status(500)
      .json({ message: "Could not create product because database issue." });
  }

  return res.status(200).json({
    message: "Create product successfully.",
  });
});

productRouter.get("/category", async (req, res) => {
  let result;
  try {
    result = await connectionPool.query(`
      select category from products
      group by category  
      `);
  } catch {
    return res.status(500).json({ message: "Could not get the category" });
  }
});

productRouter.get("/", async (req, res) => {
  const category = req.query.category;
  let result;

  try {
    result = await connectionPool.query(
      `
        select * from products
        where
        (category = $1 or $1 is null or $1 = '')
        `,
      [category]
    );
  } catch {
    return res
      .status(500)
      .json({ message: "Could not get the data because database issue." });
  }

  if (!result.rows[0]) {
    return res.status(400).json({ message: "Invalid query parameters." });
  }

  return res.status(200).json({ data: result.rows });
});

productRouter.get("/:productId", async (req, res) => {
  const productIdFromClient = req.params.productId;
  let result;

  try {
    result = await connectionPool.query(
      `
      select * from products
      where id = $1
      `,
      [productIdFromClient]
    );
  } catch {
    return res
      .status(500)
      .json({ message: "Could not get the data because database issue." });
  }
  if (!result.rows[0]) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res.status(200).json({ data: result.rows });
});

productRouter.put("/:productId", async (req, res) => {
  const productIdFromClient = req.params.productId;

  const updatedProduct = {
    ...req.body,
    updated_at: new Date(),
  };

  try {
    await connectionPool.query(
      `
      update products
      set name = $2,
      description = $3 ,
      price = $4 ,
      url = $5 ,
      category = $6 ,
      updated_at = $7
      where id = $1
      `,
      [
        productIdFromClient,
        updatedProduct.name,
        updatedProduct.description,
        updatedProduct.price,
        updatedProduct.url,
        updatedProduct.category,
        updatedProduct.updated_at,
      ]
    );
  } catch {
    return res
      .status(500)
      .json({ message: "Could not update product because database issue" });
  }

  return res.status(200).json({ message: "Product has been updated" });
});

productRouter.delete("/:productId", async (req, res) => {
  const productIdFromClient = req.params.productId;

  const result = await connectionPool.query(
    `
    select * from products
    where id = $1
    `,
    [productIdFromClient]
  );

  try {
    await connectionPool.query(
      `
      delete from products
      where id = $1
      `,
      [productIdFromClient]
    );
  } catch {
    return res
      .status(500)
      .json({ message: "Could not delete the data because database issue." });
  }

  if (!result.rows[0]) {
    return res.status(404).json({ message: "Product not found." });
  }

  return res
    .status(200)
    .json({ message: `Product id ${productIdFromClient} has been deleted` });
});

export default productRouter;
