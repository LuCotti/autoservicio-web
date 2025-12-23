# Sistema de Autoservicio

Aplicación web full stack para realizar pedidos mediante un sistema de autoservicio.

## Funcionalidades

- Panel de cliente:
  - Visualización de productos
  - Creación de pedidos
  - Descarga de ticket en PDF
- Panel de administrador:
  - Inicio de sesión
  - Visualización, creación, modificación y eliminación de productos

## Tecnologías

- HTML
- CSS
- JavaScript
- Node.js
- Express
- EJS
- bcrypt
- zod
- multer
- pdfkit
- sequelize
- Base de datos MySQL

## Capturas de pantalla

### Cliente

#### Bienvenida
![Captura de bienvenida](./images/bienvenida.png)

#### Productos
![Captura de productos](./images/productos.png)

#### Carrito
![Captura de carrito](./images/carrito.png)

#### Ticket en Web
![Captura de ticket](./images/ticket-web.png)

#### Ticket en PDF
![Captura de ticket (PDF)](./images/ticket-pdf.png)

### Administración

#### Registro

![Captura de registro](./images/registro.png)

#### Login
![Captura de login](./images/login.png)

#### Dashboard
![Captura de dashboard](./images/dashboard.png)

#### Alta de Producto
![Captura de alta de producto](./images/alta-producto.png)

#### Modificación de Producto
![Captura de modificación de producto](./images/modificar-producto.png)

## Instalación
1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Configurar las variables de entorno
4. Crear una base de datos local
5. Crear un usuario para la administración mediante la petición *Crear administrador* detallada en el archivo *api.http*

## Ejecución
- Modo desarrollo:
```bash
npm run dev
```
- Modo estándar:
```bash
npm start
```