const router = require("express").Router();
const { registrarUsuario, validarLogin, irADashboard, irALogin } = require('../controllers/administrador.js');

router.post("/register", registrarUsuario);
router.post("/", validarLogin);
router.get("/dashboard", irADashboard);
router.get("/", irALogin);

module.exports = router;