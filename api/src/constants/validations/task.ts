import { ValidationField } from '../../interfaces/IValidateBody';
import { TYPES_MASKS, TYPES_VALIDATIONS } from '../validations';

export const CREATE_TASK_VALIDATIONS: ReadonlyArray<ValidationField> =
  Object.freeze([
    {
      name: 'title',
      type: 'string',
      required: true,
      applyMask: TYPES_MASKS.pascal
    },
    {
      type: 'string',
      required: true,
      name: 'description'
    },
    {
      name: 'dueDate',
      type: 'string',
      required: true,
      format: TYPES_VALIDATIONS.date
    },
    {
      type: 'string',
      required: true,
      name: 'status',
      format: TYPES_VALIDATIONS.taskStatus
    },
    {
      name: 'labels',
      type: 'object',
      required: true
    }
  ]);

export const UPDATE_TASK_VALIDATIONS: ReadonlyArray<ValidationField> =
  Object.freeze([
    {
      name: 'id',
      type: 'number',
      required: true
    },
    {
      name: 'title',
      type: 'string',
      applyMask: TYPES_MASKS.pascal
    },
    {
      type: 'string',
      name: 'description'
    },
    {
      name: 'dueDate',
      type: 'string',
      format: TYPES_VALIDATIONS.date
    },
    {
      type: 'string',
      name: 'status',
      format: TYPES_VALIDATIONS.taskStatus
    },
    {
      name: 'labels',
      type: 'object'
    }
  ]);

export const DELETE_TASK_VALIDATIONS: ReadonlyArray<ValidationField> =
  Object.freeze([
    {
      name: 'id',
      type: 'number',
      required: true
    }
  ]);
