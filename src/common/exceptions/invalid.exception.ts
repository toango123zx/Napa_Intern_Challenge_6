import { ClientException } from "@tsed/exceptions";

import { StatusCodes } from "http-status-codes";

export class ConflictException extends ClientException {
  constructor(public readonly resource?: string) {
    super(StatusCodes.BAD_REQUEST, `Invalid input data.`);
  }
}
