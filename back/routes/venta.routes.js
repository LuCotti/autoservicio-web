const router = require("express").Router();
const { descargarTicket, registrar, traerPorId, traerTodas } = require('../controllers/venta');

router.post('/ticket', descargarTicket);
router.post("/", registrar);
router.get("/:id", traerPorId);
router.get("/", traerTodas);

module.exports = router;