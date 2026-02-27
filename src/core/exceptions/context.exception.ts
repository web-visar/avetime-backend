import { HttpException, HttpStatus } from '@nestjs/common';

export class MissingContextException extends HttpException {
  constructor(contextType: string) {
    const message = `Missing ${contextType} context. Please ensure you are authenticated and have the proper permissions.`;
    super(message, HttpStatus.UNAUTHORIZED);
  }
}

export class InvalidContextException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
