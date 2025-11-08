const Producto = require("../models/producto.js");
const router = require("express").Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// Crear producto
router.post("/", upload.single("imagen"), async(req, res) => {
  try{
    const { nombre, precio, categoria } = req.body;
    const imagen = req.file.filename;
    //todo: validar que vengan todos los datos.
    const resultado = await Producto.create({
      nombre: nombre,
      precio: precio,
      imagen: imagen,
      categoria: categoria,
    });
    return res.status(201).json(resultado);
  }
  catch (error) {
    if(error instanceof TypeError) {
      return res.status(400).send({ message: "Falta algun parametro" });
    } else {
      console.log(error);
      return res.status(500).send({ message: "Error interno" });
    }
  }
});

// Traer todos los productos
router.get("/", async(req, res) => {
  try {
    const productos = await Producto.findAll();
    return res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: "Error interno" });
  }
});

// Ir a la pantalla de alta de producto
router.get("/alta", (req, res) => {
  res.render("../views/alta-producto");
});

// Ir a la pantalla de modificar un producto
router.get("/modificar", (req, res) => {
  res.render("../views/modificar-producto");
});

// Traer un producto por su id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);

    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    return res.status(200).json(producto);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Traer productos por categoría
router.get("/categoria/:categoria", async (req, res) => {
  try {
    const { categoria } = req.params;

    const productos = await Producto.findAll({
      where: {
        categoria: categoria
      }
    });

    if (!productos) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    return res.status(200).json(productos);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error interno del servidor" });
    }
});

// Modificar un producto por su id
router.put("/:id", async (req, res) => {
  try {
    const { nombre, precio, imagen, categoria } = req.body;
    const { id } = req.params;
    const modificado = await Producto.update(
      {
        nombre: nombre,
        precio: precio,
        imagen: imagen,
        categoria: categoria
      },
      {
        where: {
          id: id
        }
      }
    );
    return res.status(200).send(modificado);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(400).send({ message: "Falta algún parámetro" });
    } else {
      return res.status(500).send({ message: "Error interno del servidor" });
    }
  }
});

// Dar de baja un producto (baja lógica)
router.put("/activo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(400).send({ message: "Producto no encontrado" });
    const modificado = await Producto.update(
      {
        activo: producto.activo ? false : true
      },
      {
        where: {
          id: id
        }
      }
    );
    return res.status(200).send(modificado);
  } catch (error) {
    return res.status(500).send({ message: "Error interno del servidor" });
  }
});

module.exports = router;