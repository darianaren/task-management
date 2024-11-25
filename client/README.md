# CLIENT APP con React JS y Next JS

Este proyecto es un cliente frontend desarrollado con Next.js y React. Está diseñado para interactuar con una API RESTful, ofreciendo una interfaz intuitiva para gestionar usuarios y tareas. Incluye funcionalidades como creación, edición, eliminación y filtrado, proporcionando una experiencia dinámica y eficiente para los usuarios.

## Requisitos ✅

- npm
- Node.js >= 16

## Configuración del Proyecto 🚀

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/darianaren/task-management.git
   ```

2. **Instala las dependencias**: Entra al directorio del proyecto y ejecuta el siguiente comando para instalar las dependencias necesarias.

   ```bash
   cd <directorio-del-proyecto>/client
   npm install --legacy-peer-deps
   ```

3. **Inicia el servidor de desarrollo:** Una vez instaladas las dependencias, inicia el servidor de desarrollo con el siguiente comando.

   ```bash
   npm run dev
   ```

4. **Abre la aplicación en tu navegador:** La aplicación debería estar disponible en tu navegador en la siguiente URL.

   ```bash
   http://localhost:4000
   ```

5. **Verifica el funcionamiento:** Asegúrate de que la APP funcione correctamente. Recuerda que la mayoría de las funcionalidades requieren que la API esté levantada.

## Scripts 📎

- **`npm run build`**: Compila el proyecto TypeScript en JavaScript.
- **`npm run start`**: Ejecuta la aplicación compilada.
- **`npm run dev`**: Ejecuta la aplicación en modo de desarrollo.
- **`npm run lint`**: Ejecuta ESLint para verificar errores en el código.

## Dependencias principales 📚

- **React JS**: La última versión experimental de React, utilizada para crear interfaces de usuario.
- **Next JS**: El framework central para construir aplicaciones React con renderizado del lado del servidor y generación estática.
- **SWR**: Una biblioteca de obtención de datos para React.
- **nookies**: Para gestionar cookies en proyectos Next.js.

## Notas

- Asegúrate de que Node.js y npm están instalados en tu sistema antes de proceder.
- Si encuentras problemas de dependencias durante la instalación, utiliza npm install **`--legacy-peer-deps`** para resolver los conflictos.
- Esta aplicación está configurada para un conjunto específico de versiones de dependencias, así que evita actualizar las dependencias a menos que las hayas probado a fondo.
