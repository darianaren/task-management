import { TYPES_MASKS } from '../validations';
import { ValidationField } from '../../interfaces/IValidateBody';

export const CREATE_LABEL_VALIDATIONS: ReadonlyArray<ValidationField> =
  Object.freeze([
    {
      max: 15,
      min: 3,
      name: 'label',
      type: 'string',
      required: true,
      applyMask: TYPES_MASKS.pascal
    }
  ]);
