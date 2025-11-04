const Administrador = require("../models/administrador.js");
const { hashPassword, comparePassword } = require('../utils/bcrypt.js');
const router = require("express").Router();

router.post("/register", async (req, res) => {
    try{
        // 1 tomar datos, 2 trabajar con datos 3 dar respuesta 
        const { user, pass } = req.body;
        const hashedPass = await hashPassword(pass);
        console.log(user, pass);
        const resultado = await Administrador.create({
            mail: user,
            clave: hashedPass
        });

        //res.send(resultado);
        return res.status(201).json(resultado);
    }catch(error){
        if(error instanceof TypeError){
            res.status(400).send({ message: "Falta algun parametro" })
        }
        else{
            console.log(error);
            res.status(500).send({ message: "Error interno" })
        }
    }
});

router.get("/", (req, res) => {
  res.render('../views/login');
});

router.post("/", async(req, res) => {
    try {
        const { mail, pass } = req.body;

        // Validar campos
        if (!mail || !pass) {
            return res.status(400).json({ error: "Faltan datos" });
        }

        const admin = await Administrador.findOne({ where: { mail } });

        if (!admin) {
            return res.status(401).json({ error: "Email o contraseña incorrectos" });
        }

        const validPass = await comparePassword(pass, admin.clave);

        if (!validPass) {
            return res.status(401).json({ error: "Email o contraseña incorrectos" });
        }

        // Si todo ok, responder
        res.json({
            message: "Login exitoso",
            administrador: {
                id: admin.id,
                mail: admin.mail
            },
            redirectTo: "/administrator/dashboard"
        });

    } catch (error) {
        console.error("Error en login administrador:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
})

router.get("/dashboard", (req, res) => {
    res.render('../views/dashboard');
});

module.exports = router;