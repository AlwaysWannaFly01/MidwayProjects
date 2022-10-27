import { HttpStatus, MidwayHttpError } from '@midwayjs/core';

export class CustomHttpError extends MidwayHttpError {
  constructor() {
    super('my custom error', HttpStatus.BAD_REQUEST);
  }
}
