function validarDatos(req, res, next) {
  try{
    const { nombre, precio, categoria } = req.body;
    const imagen = req.file ? req.file.filename : undefined;
    if (!nombre || !precio || !categoria || !imagen) {
      throw new Error('Faltan datos');
    }
    next();
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

export { validarDatos };