const { Venta, Producto } = require("../models/relaciones.js");
const PDFDocument = require('pdfkit');

function descargarTicket(req, res) {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=ticket.pdf');
  const { nombreCliente, fecha, nombreEmpresa, productosCarrito, precioTotal } = req.body;
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.text(`Cliente: ${nombreCliente}`);
  doc.text(`Fecha: ${fecha}`);
  doc.text(`Empresa: ${nombreEmpresa}`);
  doc.moveDown();
  let data = [
    ["CANTIDAD", "NOMBRE", "PRECIO UNIT.", 'PRECIO TOTAL']
  ];
  for (let producto of productosCarrito) {
    data.push([`${producto.cantidad}`, `${producto.nombre}`, `${producto.precio}`, `${producto.cantidad * producto.precio}`]);
  }
  doc.table({
    rowStyles: (i) => {
      return i < 1
        ? { border: [0, 0, 2, 0], borderColor: "black" }
        : { border: [0, 0, 1, 0], borderColor: "#aaa" };
    },
    data: data,
  });
  doc.moveDown();
  doc.text(`PRECIO TOTAL: ${precioTotal}`);
  doc.end();
}

async function registrar(req, res) {
  try {
    const { nombreCliente, fecha, precioTotal, productos } = req.body;
    const venta = await Venta.create(
      {
        nombreCliente: nombreCliente,
        fecha: fecha,
        precioTotal: precioTotal
      }
    );
    await venta.addProductos(productos);
    return res.status(201).json(venta);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(400).json({ message: "Falta algún parámetro" });
    } else {
      console.log(error);
      return res.status(500).json({ message: "Error interno" });
    }
  }
}

async function traerPorId(req, res) {
  const { id } = req.params;
  try {
    const producto = await Venta.findByPk(id);
    if (!producto) return res.status(404).json({ message: "Venta no encontrada" });
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ message: "Error interno" });
  }
}

async function traerTodas(req, res) {
  try {
    const resultado = await Venta.findAll({ include: Producto });
    return res.status(200).json(resultado);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error interno" });
  }
}

module.exports = { descargarTicket, registrar, traerPorId, traerTodas };