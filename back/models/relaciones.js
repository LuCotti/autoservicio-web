const Producto = require('./producto');
const Venta = require('./venta');

Producto.belongsToMany(Venta, { through: 'ProductoVenta' });
Venta.belongsToMany(Producto, { through: 'ProductoVenta' });

module.exports = { Producto, Venta };