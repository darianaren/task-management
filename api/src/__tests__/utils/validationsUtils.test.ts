import { TASK_STATUS } from '../../constants/taskStatus';
import { base64ToString } from '../../utils/base64Utils';
import { MASKS, VALIDATIONS } from '../../utils/validationsUtils';
import { TYPES_MASKS, TYPES_VALIDATIONS } from '../../constants/validations';

jest.mock('../../utils/base64Utils', () => ({
  base64ToString: jest.fn()
}));
describe('Validation Body Utility functions', () => {
  describe('Validations', () => {
    describe('date validation', () => {
      it('should return true for a valid date', () => {
        const result = VALIDATIONS[TYPES_VALIDATIONS.date]('2024-11-21');
        expect(result).toBe(true);
      });

      it('should return false for an invalid date format', () => {
        const result = VALIDATIONS[TYPES_VALIDATIONS.date]('21-11-2024');
        expect(result).toBe(false);
      });

      it('should return false for an invalid date value', () => {
        const result = VALIDATIONS[TYPES_VALIDATIONS.date]('2024-02-30');
        expect(result).toBe(false);
      });
    });

    describe('email validation', () => {
      it('should return true for a valid email', () => {
        const result = VALIDATIONS[TYPES_VALIDATIONS.email]('test@example.com');
        expect(result).toBe(true);
      });

      it('should return false for an invalid email', () => {
        const result = VALIDATIONS[TYPES_VALIDATIONS.email]('test@.com');
        expect(result).toBe(false);
      });
    });

    describe('name validation', () => {
      it('should return true for a valid name', () => {
        const result = VALIDATIONS[TYPES_VALIDATIONS.name]('John Doe');
        expect(result).toBe(true);
      });

      it('should return false for a name with invalid characters', () => {
        const result = VALIDATIONS[TYPES_VALIDATIONS.name]('John123');
        expect(result).toBe(false);
      });
    });

    describe('taskStatus validation', () => {
      it('should return true for a valid task status', () => {
        const result = VALIDATIONS[TYPES_VALIDATIONS.taskStatus](
          TASK_STATUS[0]
        );
        expect(result).toBe(true);
      });

      it('should return false for an invalid task status', () => {
        const result =
          VALIDATIONS[TYPES_VALIDATIONS.taskStatus]('INVALID_STATUS');
        expect(result).toBe(false);
      });
    });

    describe('password validation', () => {
      it('should return true for a valid password length', () => {
        (base64ToString as jest.Mock).mockReturnValue('password123');
        const result =
          VALIDATIONS[TYPES_VALIDATIONS.password]('encodedPassword');
        expect(result).toBe(true);
        expect(base64ToString).toHaveBeenCalledWith('encodedPassword');
      });

      it('should return false for a password shorter than 6 characters', () => {
        (base64ToString as jest.Mock).mockReturnValue('pass');
        const result =
          VALIDATIONS[TYPES_VALIDATIONS.password]('encodedPassword');
        expect(result).toBe(false);
        expect(base64ToString).toHaveBeenCalledWith('encodedPassword');
      });
    });
  });

  describe('Masks', () => {
    describe('base64ToString mask', () => {
      it('should call the base64ToString function', () => {
        (base64ToString as jest.Mock).mockReturnValue('decodedString');
        const result = MASKS[TYPES_MASKS.base64ToString]('encodedString');
        expect(result).toBe('decodedString');
        expect(base64ToString).toHaveBeenCalledWith('encodedString');
      });
    });

    describe('lowercase mask', () => {
      it('should convert a string to lowercase', () => {
        const result = MASKS[TYPES_MASKS.lower]('Hello World');
        expect(result).toBe('hello world');
      });
    });

    describe('uppercase mask', () => {
      it('should convert a string to uppercase', () => {
        const result = MASKS[TYPES_MASKS.upper]('Hello World');
        expect(result).toBe('HELLO WORLD');
      });
    });

    describe('pascal case mask', () => {
      it('should convert a string to PascalCase', () => {
        const result = MASKS[TYPES_MASKS.pascal]('hello world');
        expect(result).toBe('Hello World');
      });
    });

    describe('default mask', () => {
      it('should return the input value unmodified', () => {
        const result = MASKS.default('Hello World');
        expect(result).toBe('Hello World');
      });
    });
  });
});
