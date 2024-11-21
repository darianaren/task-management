import { ValidationField } from '../../interfaces/IValidateBody';
import { TYPES_MASKS, TYPES_VALIDATIONS } from '../validations';

export const LOGIN_VALIDATIONS: ReadonlyArray<ValidationField> = Object.freeze([
  {
    name: 'email',
    type: 'string',
    required: true,
    applyMask: TYPES_MASKS.lower,
    format: TYPES_VALIDATIONS.email
  },
  {
    type: 'string',
    required: true,
    name: 'password',
    format: TYPES_VALIDATIONS.password,
    applyMask: TYPES_MASKS.base64ToString
  }
]);

export const REGISTER_VALIDATIONS: ReadonlyArray<ValidationField> =
  Object.freeze([
    {
      name: 'email',
      type: 'string',
      required: true,
      applyMask: TYPES_MASKS.lower,
      format: TYPES_VALIDATIONS.email
    },
    {
      name: 'name',
      type: 'string',
      required: true,
      applyMask: TYPES_MASKS.pascal,
      format: TYPES_VALIDATIONS.name
    },
    {
      type: 'string',
      required: true,
      name: 'password',
      format: TYPES_VALIDATIONS.password,
      applyMask: TYPES_MASKS.base64ToString
    }
  ]);
