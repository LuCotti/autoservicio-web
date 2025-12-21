import Administrador from '../models/administrador.js';
import { comparePassword } from '../utils/bcrypt.js';
import zod from 'zod';

const User = zod.object({
  email: zod.email(),
  password: zod.string().min(8),
});

async function validarRegistro(req, res, next) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: 'Faltan datos' });
    }
    User.parse(req.body);
    next();
  } catch (error) {
    console.log(error);
    if (error instanceof TypeError) {
      res.status(400).json({ message: 'Falta algún parámetro' });
    } else {
      res.status(500).json({ message: 'Error interno' });
    }
  }
}

async function validarLogin(req, res, next) {
  try {
    const { mail, pass } = req.body;

    // Validar campos
    if (!mail || !pass) {
      return res.status(400).json({ error: 'Faltan datos' });
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
    console.error('Error en login administrador:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

export { validarRegistro, validarLogin };
