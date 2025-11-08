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
    const url = "http://localhost:5501";
    res.render('../views/login', { url: url });
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
    const categoriaA = "Faroles";
    const categoriaB = "Plafones";
    const productos = [
        {
            id: 1,
            cantidad: 1,
            nombre: "PRUEBA 01",
            precio: 111,
            imagen: "/public/producto-01/PRUEBA-01.webp",
            categoria: categoriaA,
            activo: true,
        },
        {
            id: 2,
            cantidad: 1,
            nombre: "PRUEBA 02",
            precio: 222,
            imagen: "/public/producto-02/PRUEBA-02.webp",
            categoria: categoriaA,
            activo: true,
        },
        {
            id: 3,
            cantidad: 1,
            nombre: "PRUEBA 03",
            precio: 333,
            imagen: "/public/producto-03/PRUEBA-03.webp",
            categoria: categoriaA,
            activo: true,
        },
        {
            id: 4,
            cantidad: 1,
            nombre: "PRUEBA 04",
            precio: 444,
            imagen: "/public/producto-04/PRUEBA-04.webp",
            categoria: categoriaA,
            activo: true,
        },
        {
            id: 5,
            cantidad: 1,
            nombre: "PRUEBA 05",
            precio: 555,
            imagen: "/public/producto-05/PRUEBA-05.webp",
            categoria: categoriaA,
            activo: true,
        },
        {
            id: 6,
            cantidad: 1,
            nombre: "PRUEBA 06",
            precio: 666,
            imagen: "/public/producto-06/PRUEBA-06.webp",
            categoria: categoriaB,
            activo: true,
        },
        {
            id: 7,
            cantidad: 1,
            nombre: "PRUEBA 07",
            precio: 777,
            imagen: "/public/producto-07/PRUEBA-07.webp",
            categoria: categoriaB,
            activo: true,
        },
        {
            id: 8,
            cantidad: 1,
            nombre: "PRUEBA 08",
            precio: 888,
            imagen: "/public/producto-08/PRUEBA-08.webp",
            categoria: categoriaB,
            activo: true,
        },
        {
            id: 9,
            cantidad: 1,
            nombre: "PRUEBA 09",
            precio: 999,
            imagen: "/public/producto-09/PRUEBA-09.webp",
            categoria: categoriaB,
            activo: true,
        },
        {
            id: 10,
            cantidad: 1,
            nombre: "PRUEBA 10",
            precio: 101010,
            imagen: "/public/producto-10/PRUEBA-10.webp",
            categoria: categoriaB,
            activo: true,
        },
    ];    
    res.render('../views/dashboard', { productos: productos });
});

module.exports = router;