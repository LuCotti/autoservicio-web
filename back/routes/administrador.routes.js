import { Router } from 'express';
const router = Router();
import { registrarUsuario, irALogin, irADashboardJSON, irADashboard } from '../controllers/administrador.js';
import { validarRegistro, validarLogin } from '../middlewares/administrador.js';

router.post("/register", validarRegistro, registrarUsuario);
router.post("/", validarLogin, irADashboardJSON);
router.get("/dashboard", irADashboard);
router.get("/", irALogin);

export default router;