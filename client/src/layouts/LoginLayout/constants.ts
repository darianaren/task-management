import { INPUT_MASKS } from "@/constants/inputMasks";

export const INITIAL_STATE_FORM = Object.freeze({
  email: "",
  password: ""
});

export const FORM_VALIDATIONS = Object.freeze({
  email: {
    required: true,
    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
    message: "El correo electrónico no es válido."
  },
  password: {
    required: true,
    message: "Por favor, introduce una contraseña."
  }
});

export const FORM_MASKS = Object.freeze({
  email: INPUT_MASKS.LOWER
});

export const ERROR_MESSAGES: {
  [key: string]: string;
} = Object.freeze({
  "Invalid password": "Contraseña incorrecta",
  default: "Ha ocurrido un error al iniciar sesión",
  "Missing password": "Por favor, introduzca una contraseña",
  "Missing email": "Por favor, introduzca un correo electrónico",
  "User not found": "Debes registrarte para poder iniciar sesión"
});
