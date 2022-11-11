/**
 * General exception object
 */
class APIException extends Error {
  constructor(name: string) {
    super(name);
  }
}

export default APIException;
