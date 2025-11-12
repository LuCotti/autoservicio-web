const { Producto } = require("../models/relaciones.js");
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
      return res.status(400).json({ message: "Falta algún parámetro" });
    } else {
      console.log(error);
      return res.status(500).json({ message: "Error interno" });
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
    return res.status(500).json({ message: "Error interno" });
  }
});

//producto?pagina=2&limite=10
router.get('/', async (req, res) => {
  const pagina = req.params.pagina || 1;
  const limite = req.params.limite || 10;
  const desplazamiento = (pagina -1) * limite
/*
  try{
    const { count, rows } = await Producto.findAndCountAll({
      where: {
        // mis condiciones
      },
      order: []
    })
  }
    */
});

// Ir a la pantalla de alta de producto
router.get("/alta", (req, res) => {
  res.render("../views/alta-producto");
});

// Ir a la pantalla de modificar un producto
router.get("/modificar", (req, res) => {
  res.render("../views/modificar-producto");
});

// Ir a la pantalla de modificar producto con el producto por req params
router.get("/modificar/:id", async(req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const producto = await Producto.findByPk(id);
    if(!producto){
      return res.status(404).send("Producto no encontrado");
    }  
    //console.log(producto.nombre, producto.precio);
    res.render("../views/modificar-producto", { producto });
    
  }
  catch(error){
    console.error("Error al obtener el producto", error);
    res.status(500).send("Error al cargar el producto")
  }
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
router.put("/:id", upload.single('imagen'), async (req, res) => {
  try {
    const { id } = req.params;
    const nombre = req.body.nombre || undefined;
    const precio = req.body.precio || undefined;
    const categoria = req.body.categoria || undefined;
    const imagen = req.file || undefined;
    const modificado = await Producto.update(
      {
        nombre: nombre,
        precio: precio,
        imagen: imagen ? imagen.filename : undefined,
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
      return res.status(400).json({ message: "Falta algún parámetro" });
    } else {
      return res.status(500).json({ message: "Error interno del servidor" });
    }
  }
});

// Dar de baja un producto (baja lógica)
router.put("/activo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(400).json({ message: "Producto no encontrado" });
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
    return res.status(200).json({ modificado });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
});

// Eliminar un producto
router.delete("/:id", async (req, res) => {
  try {
    const eliminado = await Producto.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json({ eliminado });
  } catch(error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno" });
  }
});

module.exports = router;