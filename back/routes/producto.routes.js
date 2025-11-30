import { Router } from 'express';
const router = Router();
import upload from '../middlewares/multer.js';
import { crear, irACrear, irAModificar, traerPorCategoria, traerTodos, traerTodosConPaginacion, modificar, darDeBaja, eliminar } from '../controllers/producto.js';
import { validarDatos } from '../middlewares/producto.js';

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

export default router;