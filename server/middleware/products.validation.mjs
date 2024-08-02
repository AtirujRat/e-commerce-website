export const validationCreateProduct = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ message: "Missing product name" });
  }

  if (req.body.name.length > 50) {
    return res
      .status(400)
      .json({ message: "Letters must not greater than 50." });
  }
  if (!req.body.description) {
    return res.status(400).json({ message: "Missing description" });
  }

  if (req.body.description > 200) {
    return res
      .status(400)
      .json({ message: "Letters must not greater than 200." });
  }

  if (typeof req.body.price !== "number") {
    return res.status(400).json({ message: "Price must be numeric." });
  }

  if (!req.body.price) {
    return res.status(400).json({ message: "Missing price" });
  }

  if (!req.body.url) {
    return res.status(400).json({ message: "Missing url" });
  }
  if (!req.body.category) {
    return res.status(400).json({ message: "Missing category" });
  }

  if (req.body.category < 30) {
    return res
      .status(400)
      .json({ message: "Letters must not greater than 30." });
  }

  next();
};
