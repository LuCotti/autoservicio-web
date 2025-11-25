const router = require("express").Router();
const { registrarUsuario, irALogin, irADashboardJSON, irADashboard } = require('../controllers/administrador');
const { validarRegistro, validarLogin } = require('../middlewares/administrador');

router.post("/register", validarRegistro, registrarUsuario);
router.post("/", validarLogin, irADashboardJSON);
router.get("/dashboard", irADashboard);
router.get("/", irALogin);

module.exports = router;