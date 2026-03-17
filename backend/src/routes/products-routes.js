import express from "express";
import { getProducts, getSingleProduct, seedProducts } from "../controllers/product-controller.js";

const ProductsRouter = express.Router();

ProductsRouter.post("/seed-products", seedProducts);

ProductsRouter.get("/get-products", getProducts);

ProductsRouter.get("/:id", getSingleProduct);

export default ProductsRouter;