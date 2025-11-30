import { Router } from 'express';
const router = Router();
import { descargarTicket, registrar, traerPorId, traerTodas } from '../controllers/venta.js';

router.post('/ticket', descargarTicket);
router.post("/", registrar);
router.get("/:id", traerPorId);
router.get("/", traerTodas);

export default router;