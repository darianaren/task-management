# API RESTful con SQLite

Este proyecto es una API RESTful construida con Express y SQLite. Está diseñada para manejar operaciones de CRUD y otras funcionalidades relacionadas con usuarios y tareas.

## Requisitos ✅

- npm
- Node.js >= 16
- Base de datos SQLite

## Configuración del Proyecto 🚀

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/darianaren/task-management.git
   ```

2. **Instala las dependencias**: Entra al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias.

   ```bash
   cd <directorio-del-proyecto>/api
   npm install
   ```

3. **Inicia el servidor de desarrollo:** Una vez instaladas las dependencias, inicia el servidor de desarrollo con el siguiente comando.

   ```bash
   npm run dev
   ```

4. **Abre la aplicación en tu navegador:** La aplicación debería estar disponible en tu navegador en la siguiente URL.

   ```bash
   http://localhost:3000
   ```

5. **Verifica el funcionamiento:** Asegúrate de que la API funcione correctamente realizando peticiones a las rutas.

## Scripts 📎

- **`npm run build`**: Compila el proyecto TypeScript en JavaScript.
- **`npm run start`**: Ejecuta la aplicación compilada.
- **`npm run dev`**: Ejecuta la aplicación en modo de desarrollo con `ts-node-dev`.
- **`npm run test`**: Ejecuta los tests con Jest.
- **`npm run lint`**: Ejecuta ESLint para verificar errores en el código.

## Dependencias principales 📚

- **Express**: Framework para manejar peticiones HTTP.
- **SQLite** y **sqlite3**: Base de datos para almacenar la información.
- **dotenv**: Manejo de variables de entorno.
- **jsonwebtoken**: Autenticación basada en JWT.
- **bcrypt**: Encriptación de contraseñas.

## Endpoints 🌐

### Auth 🔐

**Inicio de sesión**
- **POST** `/auth/login`
  - **Body**: `{ "email": "test@example.com", "password": "mySecretPassword" }`
  - **Respuesta**: `200 OK`

**Registro**
- **POST** `/auth/register`
  - **Body**: `{ "name": "User Test", "email": "test@example.com", "password": "mySecretPassword" }`
  - **Respuesta**: `201 Created`

### Usuarios 👤

**Obtener un usuario por ID**
- **GET** `/users`
  - **Respuesta**: `200 OK`

### Etiquetas 🏷

**Crear una nueva etiqueta**
- **POST** `/labels`
  - **Body**: `{ "label": "Importante" }`
  - **Respuesta**: `201 Created`

### Tareas 📄

**Crear una tarea**
- **POST** `/tasks`
  - **Body**: `{ "title": "Título", "description": "Descripción", "dueDate": "2025-01-15", "status": "pending", "labels": ["Importante"] }`
  - **Respuesta**: `201 Created`

**Obtener todas las tareas de un usuario**
- **GET** `/tasks`
  - **Query Params**: `?page=1&limit=10`
  - **Respuesta**: `200 OK`

**Eliminar una tarea**
- **DELETE** `/tasks`
  - **Body**: `{ "id": 4 }`
  - **Respuesta**: `204 No Content`

**Actualizar una tarea**
- **PUT** `/tasks`
  - **Body**: `{ "id": 4, "title": "nuevo título", "description": "nueva descripción" }`
  - **Respuesta**: `204 No Content`

**Obtener las métricas de un usuario**
- **GET** `/tasks/metrics`
  - **Respuesta**: `200 OK`

## Licencia 📖

Este proyecto está bajo la licencia ISC.

