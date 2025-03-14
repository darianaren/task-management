import { INPUT_MASKS } from "@/constants/inputMasks";

export const INITIAL_STATE_FORM = Object.freeze({
  name: "",
  email: "",
  password: ""
});

export const FORM_VALIDATIONS = Object.freeze({
  name: {
    required: true,
    pattern: /^[ A-Za-zÑñÁáÉéÍíÓóÚúÜü]+$/i,
    message: "El nombre no es válido."
  },
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
  name: INPUT_MASKS.PASCAL,
  email: INPUT_MASKS.LOWER
});

export const ERROR_MESSAGES: {
  [key: string]: string;
} = Object.freeze({
  default: "Ha ocurrido un error al registarse",
  "Email already in use": "El correo electrónico ya pertenece a una cuenta.",
  "The field password must be a valid format.":
    "Por favor, ingresa una contraseña válida"
});
