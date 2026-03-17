import express from "express";
import { getProducts, seedProducts } from "../controllers/product-controller.js";

const ProductsRouter = express.Router();

ProductsRouter.post("/seed-products", seedProducts);
ProductsRouter.get("/get-products", getProducts);

export default ProductsRouter;