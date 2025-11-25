const router = require("express").Router();
const upload = require('../middlewares/multer');
const { crear, irACrear, irAModificar, traerPorCategoria, traerTodos, traerTodosConPaginacion, modificar, darDeBaja, eliminar } = require('../controllers/producto');
const { validarDatos } = require('../middlewares/producto');

// Crear un producto
router.post("/", upload.single("imagen"), validarDatos, crear);

// Redireccionar
router.get("/alta", irACrear);
router.get("/modificar/:id", irAModificar);

// Traer los productos
router.get("/categoria/:categoria", traerPorCategoria);
router.get("/all", traerTodos);
router.get('/', traerTodosConPaginacion);

// Modificar un producto
router.put("/:id", upload.single('imagen'), modificar);

// Dar de baja un producto
router.put("/activo/:id", darDeBaja);

// Eliminar un producto
router.delete("/:id", eliminar);

module.exports = router;