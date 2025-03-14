# Task Management App
Este proyecto es una aplicación de gestión de tareas que consta de dos partes principales: Cliente (Frontend) y API (Backend). Ambas se comunican a través de una API RESTful, permitiendo la creación, edición, eliminación, y visualización de tareas, usuarios y etiquetas.

![image](https://github.com/user-attachments/assets/33e5b656-68de-48d0-9ff2-8c472d3e593b)

## Requisitos ✅
**Para ambos proyectos**:

- npm
- Node.js >= 16

**Base de datos para la API**:
- SQLite

## Configuración del Proyecto 🚀

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/darianaren/task-management.git
   ```
 
2. **Instalar dependencias:**

#### **Cliente (Frontend con React JS y Next JS)**
Entra en el directorio del cliente y ejecuta el siguiente comando para instalar las dependencias:

   ```bash
   cd client
   npm install --legacy-peer-deps
   ```

#### **API (Backend con Express y SQLite)**
Entra en el directorio de la API y ejecuta el siguiente comando para instalar las dependencias:

   ```bash
   cd api
   npm install
   ```

3. **Inicia el servidor de desarrollo:**
#### **Cliente:**
Una vez instaladas las dependencias, inicia el servidor de desarrollo con el siguiente comando:

   ```bash
   npm run dev
   ```

La aplicación debería estar disponible en tu navegador en: http://localhost:4000.

#### **API:**
Para iniciar el servidor de desarrollo de la API, usa el siguiente comando:

   ```bash
   npm run dev
   ```

La API estará disponible en tu navegador en: http://localhost:3000.

4. **Verificar el funcionamiento:**
Recuerda que la mayoría de las funcionalidades en el **cliente** requieren que la **API** esté en funcionamiento. Asegúrate de que ambas partes estén corriendo correctamente.

## Scripts 📎

### **Cliente (Frontend):**

- **`npm run build`**: Compila el proyecto TypeScript en JavaScript.
- **`npm run start`**: Ejecuta la aplicación compilada.
- **`npm run dev`**: Ejecuta la aplicación en modo de desarrollo.
- **`npm run lint`**: Ejecuta ESLint para verificar errores en el código.

### **API (Backend):**

- **`npm run build`**: Compila el proyecto TypeScript en JavaScript.
- **`npm run start`**: Ejecuta la aplicación compilada.
- **`npm run dev`**: Ejecuta la aplicación en modo de desarrollo con `ts-node-dev`.
- **`npm run test`**: Ejecuta los tests con Jest.
- **`npm run lint`**: Ejecuta ESLint para verificar errores en el código.

## Dependencias principales 📚

### **Cliente (Frontend):**

- **React JS**: La última versión experimental de React, utilizada para crear interfaces de usuario.
- **Next JS**: El framework central para construir aplicaciones React con renderizado del lado del servidor y generación estática.
- **SWR**: Una biblioteca de obtención de datos para React.
- **nookies**: Para gestionar cookies en proyectos Next.js.

### **API (Backend):**

- **Express**: Framework para manejar peticiones HTTP.
- **SQLite** y **sqlite3**: Base de datos para almacenar la información.
- **dotenv**: Manejo de variables de entorno.
- **jsonwebtoken**: Autenticación basada en JWT.
- **bcrypt**: Encriptación de contraseñas.
