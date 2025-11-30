import Producto from './producto.js';
import Venta from './venta.js';

Producto.belongsToMany(Venta, { through: 'producto_venta', foreignKey: 'productoId' });
Venta.belongsToMany(Producto, { through: 'producto_venta', foreignKey: 'ventaId' });

export { Producto, Venta };