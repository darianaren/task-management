/* Es recomendable guardar información sensible, como el endpoint de la API y el nombre del token,
      únicamente en variables de entorno o archivos de configuración.
     Sin embargo, para fines prácticos en esta prueba, también añado valores estáticos. */
const apiEndpoint = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const auth = `${apiEndpoint}/auth`;
const labels = `${apiEndpoint}/labels`;
const tasks = `${apiEndpoint}/tasks`;
const users = `${apiEndpoint}/users`;

export const authEndpoints = Object.freeze({
  login: `${auth}/login`,
  register: `${auth}/register`
});

export const labelsEndpoints = Object.freeze({
  create: labels
});

export const tasksEndpoints = Object.freeze({
  get: tasks,
  create: tasks,
  update: tasks,
  remove: tasks,
  metrics: `${tasks}/metrics`
});

export const usersEndpoints = Object.freeze({
  get: users
});
