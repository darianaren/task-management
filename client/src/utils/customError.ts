export class CustomError extends Error {
  details: string;

  constructor(message: string, details?: string) {
    super(message);
    this.details = details || message;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}
