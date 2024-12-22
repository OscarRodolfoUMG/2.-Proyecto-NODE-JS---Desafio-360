import { Router } from "express";
import { createCliente, getAllClientes, getClienteById, updateCliente } from "../controllers/clientes.controller.js";
import { authRequired } from "../middlewares/validateToken.js";


const router = Router();

router.get('/clientes', authRequired, getAllClientes);
router.get('/clientes/:id', authRequired, getClienteById);
router.post('/clientes', authRequired, createCliente);
router.put('/clientes/:id', authRequired, updateCliente);

export default router;