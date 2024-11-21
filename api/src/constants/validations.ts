export const TYPES_VALIDATIONS = Object.freeze({
  email: Symbol('E-mail validations'),
  name: Symbol('Name validations'),
  password: Symbol('Password validations')
});

export const TYPES_MASKS = Object.freeze({
  lower: Symbol('Convert text to lower case'),
  upper: Symbol('Convert text to upper case'),
  pascal: Symbol('Convert text to pascal case')
});
