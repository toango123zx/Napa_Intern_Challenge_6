import "reflect-metadata";

import { Exception } from "@tsed/exceptions";
import {
  HttpResponseBodySuccessDto,
  InternalServerException,
  InvalidException,
  NotFoundException,
} from "../../common";
import { BookRepsitory } from "./book.repository";
import { Book, Prisma } from "@prisma/client";

export class BookService {
  constructor(private readonly bookRepository = new BookRepsitory()) {}

  async findAll(
    page: number,
    limit: number
  ): Promise<HttpResponseBodySuccessDto<Book[]> | Exception> {
    try {
      const skip = (page - 1) * limit;
      const take = limit;

      const [books, totalRecords] = await this.bookRepository.findAll(
        skip,
        take
      );
      const totalPage = Math.ceil(totalRecords / take);
      return {
        status: "success",
        data: books,
        pagination: {
          totalItems: totalRecords,
          itemsPerPage: limit,
          currentPage: page,
          totalPages: totalPage,
        },
      };
    } catch (error) {
      return new InternalServerException();
    }
  }

  async findBookById(
    id: string
  ): Promise<HttpResponseBodySuccessDto<Book> | Exception> {
    try {
      const book = await this.bookRepository.findBookById(id);
      if (!book) {
        return new NotFoundException("book");
      }
      return { data: book, status: "success" };
    } catch (error) {
      return new InternalServerException();
    }
  }

  async createBook(
    data: Prisma.BookCreateInput
  ): Promise<HttpResponseBodySuccessDto<Book> | Exception> {
    try {
      data.published_date = new Date(data.published_date);
      const book = await this.bookRepository.createBook(data);
      return { data: book, status: "success" };
    } catch (error) {
      return new InternalServerException();
    }
  }

  async updateBook(id: string, data: Prisma.BookUpdateInput) {
    try {
      const book = await this.bookRepository.findBookById(id);

      if (!book) {
        return new NotFoundException("book");
      }
      if (data.published_date && data.published_date === book.published_date) {
        return new InvalidException("immutable data");
      }
      if (data.title && data.title === book.title) {
        return new InvalidException("immutable data");
      }
      if (data.author && data.author === book.author) {
        return new InvalidException("immutable data");
      }
      if (data.description && data.description === book.description) {
        return new InvalidException("immutable data");
      }
      if (data.genre && data.genre === book.genre) {
        return new InvalidException("immutable data");
      }
      if (data.quantity && data.quantity === book.quantity) {
        return new InvalidException("immutable data");
      }
      if (data.summary && data.status === book.status) {
        return new InvalidException("immutable data");
      }

      const newBook = await this.bookRepository.updateBook(id, data);
      return { data: newBook, status: "success" };
    } catch (error) {
      return new InternalServerException();
    }
  }

  async deleteBook(id: string) {
    try {
      // const book = await this.bookRepository.findBookById(id);
      // if (!book) {
      //   return new NotFoundException("book");
      // }
      const deleteBook = await this.bookRepository.deleteBook(id);
      return { data: deleteBook, status: "success" };
    } catch (error) {
      return new InternalServerException();
    }
  }
}
