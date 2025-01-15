import { Request, Response } from "express";
import { BookService } from "./book.service";
import httpResponseDto from "../../common/dtos/httpResponse.dto";
import { Book } from "@prisma/client";
import { HttpResponseBodySuccessDto } from "../../common";

export class BookController {
  constructor(private readonly bookService = new BookService()) {}

  async findAll(req: Request, res: Response) {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const take = limit;

    const result = await this.bookService.findAll(skip, take);
    if (result instanceof Error) {
      httpResponseDto.exception(result, res);
      return;
    }
    httpResponseDto.success<Book[]>(
      result as HttpResponseBodySuccessDto<Book[]>,
      res
    );
  }

  async findBookById(req: Request, res: Response) {
    const id = req.params.id;

    const result = await this.bookService.findBookById(id);
    if (result instanceof Error) {
      httpResponseDto.exception(result, res);
      return;
    }
    httpResponseDto.success<Book>(
      result as HttpResponseBodySuccessDto<Book>,
      res
    );
  }

  async createBook(req: Request, res: Response) {
    const data = req.body;

    const result = await this.bookService.createBook(data);
    if (result instanceof Error) {
      httpResponseDto.exception(result, res);
      return;
    }
    httpResponseDto.created<Book>(
      result as HttpResponseBodySuccessDto<Book>,
      res
    );
  }

  async updateBook(req: Request, res: Response) {
    const id = String(req.params.id);
    const data = req.body;

    const result = await this.bookService.updateBook(id, data);
    if (result instanceof Error) {
      httpResponseDto.exception(result, res);
      return;
    }
    httpResponseDto.success<Book>(
      result as HttpResponseBodySuccessDto<Book>,
      res
    );
  }

  async deleteBook(req: Request, res: Response) {
    const id = String(req.params.id);

    const result = await this.bookService.deleteBook(id);
    if (result instanceof Error) {
      httpResponseDto.exception(result, res);
      return;
    }
    httpResponseDto.success<Book>(
      result as HttpResponseBodySuccessDto<Book>,
      res
    );
  }
}
