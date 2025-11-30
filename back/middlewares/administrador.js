import Administrador from '../models/administrador.js';
import { comparePassword } from '../utils/bcrypt.js';

async function validarRegistro(req, res, next) {
  try {
    const { user, pass } = req.body;
    if (!user || !pass) {
      throw new Error('Faltan datos');
    }
    next();
  } catch (error) {
    if (error instanceof TypeError) {
      console.log(error);
      res.status(400).json({ message: "Falta algún parámetro" });
    } else {
      console.log(error);
      res.status(500).json({ message: "Error interno" });
    }
  }
}

async function validarLogin(req, res, next) {
  try {
    const { mail, pass } = req.body;

    // Validar campos
    if (!mail || !pass) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const admin = await Administrador.findOne({ where: { mail } });

    if (!admin) {
      throw new Error('Email incorrecto');
    }

    const validPass = await comparePassword(pass, admin.clave);

    if (!validPass) {
      throw new Error('Contraseña incorrecta');
    }
    
    next();
  } catch (error) {
    console.error("Error en login administrador:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export { validarRegistro, validarLogin };