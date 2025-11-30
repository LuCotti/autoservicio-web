import { Producto } from '../models/relaciones.js';

async function crear(req, res) {
  try{
    const { nombre, precio, categoria } = req.body;
    const imagen = req.file.filename;
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
      console.log(error);
      return res.status(400).json({ message: "Falta algún parámetro" });
    } else {
      console.log(error);
      return res.status(500).json({ message: "Error interno" });
    }
  }
}

async function traerTodos(req, res) {
  try {
    const productos = await Producto.findAll();
    return res.status(200).json(productos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno" });
  }
}

async function traerTodosConPaginacion(req, res) {
  const offset = parseInt(req.query.offset) || 0;
  const limit = parseInt(req.query.limit) || 10; 
  const category = req.query.category || null;
  try {
    const where = {};
    if (category) {
      where.categoria = category;
    }
    const { count, rows } = await Producto.findAndCountAll({
      where,
      limit: limit,
      offset: offset,
      order: [
        ['createdAt', 'ASC'] 
      ]
    });

    //Implementar numero de paginas
    const totalItems = count;
    const totalPages = Math.ceil(totalItems / limit);
    const currentPage = (offset / limit) + 1; // 
    res.json({
      totalItems,
      totalPages,
      currentPage,
      category: category || "all",
      products: rows
    });

  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
}

function irACrear(req, res) {
  res.render("../views/alta-producto");
}

async function irAModificar(req, res) {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).send("Producto no encontrado");
    }
    res.render("../views/modificar-producto", { producto });
  } catch (error) {
    console.error("Error al obtener el producto", error);
    res.status(500).send("Error al cargar el producto");
  }
}

async function traerPorCategoria(req, res) {
  const { categoria } = req.params;
  try {
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
}

async function modificar(req, res) {
  const { id } = req.params;
  const nombre = req.body.nombre || undefined;
  const precio = req.body.precio || undefined;
  const categoria = req.body.categoria || undefined;
  const imagen = req.file || undefined;
  try {
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
}

async function darDeBaja(req, res) {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) return res.status(400).json({ message: "Producto no encontrado" });
    await Producto.update(
      {
        activo: producto.activo ? false : true
      },
      {
        where: {
          id: id
        }
      }
    );
    const modificado = await Producto.findByPk(id);
    return res.status(200).json({ modificado });
  } catch (error) {
    return res.status(500).json({ message: "Error interno del servidor" });
  }
}

async function eliminar(req, res) {
  try {
    const eliminado = await Producto.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json({ eliminado });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno" });
  }
}

export {crear, irACrear, irAModificar, traerPorCategoria, traerTodos, traerTodosConPaginacion, modificar, darDeBaja, eliminar};