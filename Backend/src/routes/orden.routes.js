import { Router } from "express";
import { createOrden, getAllOrden, getOrdenById, updateOrden } from "../controllers/orden.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get('/orden', authRequired, getAllOrden);
router.get('/orden/:id', authRequired, getOrdenById);
router.post('/orden', authRequired, createOrden);
router.put('/orden/:id', authRequired, updateOrden);

export default router;