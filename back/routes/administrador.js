const Administrador = require("../models/administrador");
const { hashPassword } = require('../utils/bcrypt.js');
const router = require("express").Router();

router.post("/register", async (req, res) => {
    try{
        // 1 tomar datos, 2 trabajar con datos 3 dar respuesta 
        console.log("Entro una pet a register");
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
  res.send("Hice un get a administrator usando el Router");
});

module.exports = router;