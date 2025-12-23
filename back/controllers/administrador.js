import Administrador from '../models/administrador.js';
import { hashPassword } from '../utils/bcrypt.js';
import { UniqueConstraintError } from 'sequelize';

async function registrarUsuario(req, res) {
  try {
    const { email, password } = req.body;
    const hashedPass = await hashPassword(password);
    const resultado = await Administrador.create({
      mail: email,
      clave: hashedPass,
    });

    return res.status(201).json(resultado);
  } catch (error) {
    console.log(error);
    if (error instanceof TypeError) {
      res.status(400).json({ message: 'Falta algún parámetro' });
    } else if (error instanceof UniqueConstraintError) {
      res.status(400).json({ message: 'El usuario ya se encuentra registrado' });
    } else {
      res.status(500).json({ message: 'Error interno' });
    }
  }
}

function irALogin(req, res) {
  res.render('login');
}

function irADashboardJSON(req, res) {
  res.send({ redirectTo: '/administrator/dashboard' });
}

function irARegister(req, res) {
  res.render('register');
}

function irADashboard(req, res) {
  res.render('dashboard');
}

export {
  registrarUsuario,
  irALogin,
  irADashboardJSON,
  irARegister,
  irADashboard,
};
