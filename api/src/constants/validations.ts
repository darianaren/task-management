export const TYPES_VALIDATIONS = Object.freeze({
  name: Symbol('Name validations'),
  date: Symbol('Date validations'),
  email: Symbol('E-mail validations'),
  password: Symbol('Password validations'),
  taskStatus: Symbol('Task status validations')
});

export const TYPES_MASKS = Object.freeze({
  lower: Symbol('Convert text to lower case'),
  upper: Symbol('Convert text to upper case'),
  pascal: Symbol('Convert text to pascal case'),
  base64ToString: Symbol('Convert base64 to string')
});
