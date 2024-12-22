import { Router } from "express";
import { createCategoriaProducto, getAllCategoriaProductos, getCategoriaProductosById, updateCategoriaProducto } from "../controllers/categoriaProductos.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/categoriaProductos', authRequired, getAllCategoriaProductos);
router.get('/categoriaProductos/:id', authRequired, getCategoriaProductosById);
router.post('/categoriaProductos', authRequired, createCategoriaProducto);
router.put('/categoriaProductos/:id', authRequired, updateCategoriaProducto);

export default router;