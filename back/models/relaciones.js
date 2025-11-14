const Producto = require('./producto');
const Venta = require('./venta');

Producto.belongsToMany(Venta, { through: 'producto_venta', foreignKey: 'productoId' });
Venta.belongsToMany(Producto, { through: 'producto_venta', foreignKey: 'ventaId' });

module.exports = { Producto, Venta };