/**
 * General exception object
 */
export class APIException extends Error {
  constructor(name: string) {
    super(name);
  }
}
