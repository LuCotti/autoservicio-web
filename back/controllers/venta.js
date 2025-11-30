import { Venta, Producto } from '../models/relaciones.js';
import PDFDocument from 'pdfkit';

function descargarTicket(req, res) {
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=ticket.pdf');
  const { nombreCliente, fecha, nombreEmpresa, productosCarrito, precioTotal } = req.body;
  const doc = new PDFDocument();
  doc.pipe(res);
  doc.text(`Cliente: ${nombreCliente}`, { align: 'center' });
  doc.text(`Fecha: ${fecha}`, { align: 'center' });
  doc.text(`Empresa: ${nombreEmpresa}`, { align: 'center' });
  doc.moveDown();
  let data = [[{ text: 'CANTIDAD', align: 'center' }, { text: 'NOMBRE', align: 'center' }, { text: 'PRECIO UNIT.', align: 'center' }, { text: 'PRECIO SUBTOTAL', align: 'center' }]];
  for (let producto of productosCarrito) {
    data.push([
      { text: `${producto.cantidad}`, align: 'center' },
      { text: `${producto.nombre}`, align: 'center'},
      { text: `$${producto.precio}`, align: 'center' },
      { text: `$${producto.cantidad * producto.precio}`, align: 'center' },
    ]);
  }
  data.push([{ colSpan: 3, text: 'PRECIO TOTAL', align: 'center' }, { text: `$${precioTotal}`, align: 'center'}]);
  doc.table({
    rowStyles: (i) => {
      return i < 1
        ? { border: [0, 0, 2, 0], borderColor: 'black' }
        : { border: [0, 0, 1, 0], borderColor: '#aaa' };
    },
    data: data,
  });
  doc.moveDown();
  doc.end();
}

async function registrar(req, res) {
  try {
    const { nombreCliente, fecha, precioTotal, productos } = req.body;
    const venta = await Venta.create({
      nombreCliente: nombreCliente,
      fecha: fecha,
      precioTotal: precioTotal,
    });
    await venta.addProductos(productos);
    return res.status(201).json(venta);
  } catch (error) {
    if (error instanceof TypeError) {
      return res.status(400).json({ message: 'Falta algún parámetro' });
    } else {
      console.log(error);
      return res.status(500).json({ message: 'Error interno' });
    }
  }
}

async function traerPorId(req, res) {
  const { id } = req.params;
  try {
    const producto = await Venta.findByPk(id);
    if (!producto) return res.status(404).json({ message: 'Venta no encontrada' });
    return res.status(200).json(producto);
  } catch (error) {
    return res.status(500).json({ message: 'Error interno' });
  }
}

async function traerTodas(req, res) {
  try {
    const resultado = await Venta.findAll({ include: Producto });
    return res.status(200).json(resultado);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error interno' });
  }
}

export { descargarTicket, registrar, traerPorId, traerTodas };