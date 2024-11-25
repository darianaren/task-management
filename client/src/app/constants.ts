import { INPUT_MASKS } from "@/constants/inputMasks";

export const INITIAL_STATE_REDUCER = Object.freeze({
  page: 1,
  title: "",
  label: [],
  status: [],
  dueDate: "",
  isLoading: false,
  orderBy: "createdAt",
  orderDirection: "DESC"
});

export const ACTIONS_TYPES = Object.freeze({
  SET_SEARCH: Symbol("Set title value"),
  CLEAR_FILTERS: Symbol("Reset filters"),
  APPLY_FILTERS: Symbol("Apply filters"),
  SET_LOADING: Symbol("Set loading value")
});

export const INITIAL_STATE_FORM = Object.freeze({
  title: "",
  label: "",
  dueDate: "",
  description: "",
  status: "pending"
});

export const FORM_VALIDATIONS = Object.freeze({
  title: {
    required: true
  },
  dueDate: {
    required: true
  },
  description: {
    required: true
  },
  status: {
    required: true
  },
  label: {
    required: false
  }
});

export const FORM_MASKS = Object.freeze({
  label: INPUT_MASKS.PASCAL
});

export const ERROR_MESSAGES: {
  [key: string]: string;
} = Object.freeze({
  "The field label must be at least 3.":
    "La etiqueta debe tener al menos 3 letras",
  "The field label must not exceed 15.":
    "La etiqueta no puede tener mas de 15 caracteres",
  "Label already exists": "Esa etiqueta ya existe",
  default: "Ha ocurrido un error al intentar agregar la etiqueta",
  "User not found":
    "Ocurrió un problema de autentificación. Por favor, vuelva a iniciar sesión."
});
