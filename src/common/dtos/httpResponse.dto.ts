import { Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HttpResponseBodySuccessDto } from "./httpResponseBodySuccess.dto";
import { HTTPException } from "@tsed/exceptions";

export class HttpResponseDto {
  async success<T>(data: HttpResponseBodySuccessDto<T>, res: Response) {
    return res.status(StatusCodes.OK).json(data);
  }

  async created<T>(data: HttpResponseBodySuccessDto<T>, res: Response) {
    return res.status(StatusCodes.CREATED).json(data);
  }

  async exception(exceptions: HTTPException, res: Response) {
    return res.status(exceptions.status).json({
      status: exceptions.status,
      messenger: exceptions.message,
    });
  }
}
export default new HttpResponseDto();
