/**
 * General exception object
 */
export class APIException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'APIException';
  }
}
