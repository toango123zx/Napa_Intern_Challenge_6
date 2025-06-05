import "reflect-metadata";

import { ClientException } from "@tsed/exceptions";

import { StatusCodes } from "http-status-codes";

export class InvalidException extends ClientException {
  constructor(public readonly resource?: string) {
    super(StatusCodes.BAD_REQUEST, `Invalid input data: ${resource}`);
  }
}
