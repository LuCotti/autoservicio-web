const Producto = require("../models/producto.js");
const router = require("express").Router();

router.post("/", async(req, res) => {
    try{
        const { nombre, precio, imagen, categoria, activo } = req.body;

        //todo: validar que vengan todos los datos.

        const resultado = await Producto.create({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            categoria: categoria,
            activo: activo
        });
        return res.status(201).json(resultado);
    }
    catch(error){
        if( error instanceof TypeError ){
            res.status(400).send({ message: "Falta algun parametro" })
        }
        else{
            console.log(error);
            res.status(500).send({ message: "Error interno" })
        }
    }
});

router.get("/", async(req, res) => {
    try {
    const productos = await Producto.findAll();

    return res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Error interno" });
  }
});

//traer producto por id
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

//traer productos por categoria

//modificar un producto 
//dar de baja un producto (baja logica)

module.exports = router;