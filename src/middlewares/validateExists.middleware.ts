import { InternalServerException, NotFoundException } from "@/common";
import httpResponseDto from "@/common/dtos/httpResponse.dto";
import { BookRepsitory } from "@/modules/book/book.repository";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const validateBookExistsMiddleware = (): RequestHandler => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const bookRepository = new BookRepsitory();
      const id = req.params.id;
      const book = await bookRepository.findBookById(id);
      if (!book) {
        httpResponseDto.exception(new NotFoundException("book"), res);
        return;
      }
      next();
    } catch (error) {
      httpResponseDto.exception(new InternalServerException(), res);
      return;
    }
  };
};