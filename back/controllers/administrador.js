import Administrador from '../models/administrador.js';
import { hashPassword } from '../utils/bcrypt.js';

async function registrarUsuario(req, res) {
  try {
    const { user, pass } = req.body;
    const hashedPass = await hashPassword(pass);
    const resultado = await Administrador.create({
      mail: user,
      clave: hashedPass
    });

    return res.status(201).json(resultado);
  } catch (error) {
    if (error instanceof TypeError) {
      res.status(400).json({ message: "Falta algún parámetro" });
    } else {
      console.log(error);
      res.status(500).json({ message: "Error interno" });
    }
  }
}

function irALogin(req, res) {
  res.render('../views/login');
}

function irADashboardJSON(req, res) {
  res.send({ redirectTo: '/administrator/dashboard' });
}

function irADashboard(req, res) {
  res.render('../views/dashboard');
}

export {
  registrarUsuario,
  irALogin,
  irADashboardJSON,
  irADashboard
};