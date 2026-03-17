import express from "express";
import { getProducts, getSingleProduct, seedProducts } from "../controllers/product-controller.js";
import { verifyToken } from "../../middlewares/user-verify-token.js";

const ProductsRouter = express.Router();

ProductsRouter.post("/seed-products", seedProducts);

ProductsRouter.get("/get-products", verifyToken, getProducts);

ProductsRouter.get("/:id", verifyToken, getSingleProduct);

export default ProductsRouter;