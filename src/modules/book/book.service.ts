import { Exception } from "@tsed/exceptions";
import {
  HttpResponseBodySuccessDto,
  InternalServerException,
  NotFoundException,
} from "../../common";
import { BookRepsitory } from "./book.repository";
import { Book, Prisma } from "@prisma/client";

export class BookService {
  constructor(private readonly bookRepository = new BookRepsitory()) {}

  async findAll(
    skip: number,
    take: number
  ): Promise<HttpResponseBodySuccessDto<Book[]> | Exception> {
    try {
      const [books, totalRecords] = await this.bookRepository.findAll(
        skip,
        take
      );
      const totalPage = Math.ceil(totalRecords / take);
      return {
        status: "success",
        data: books,
        totalPage: totalPage,
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
      const newBook = await this.bookRepository.updateBook(id, data);
      return { data: newBook, status: "success" };
    } catch (error) {
      return new InternalServerException();
    }
  }

  async deleteBook(id: string) {
    try {
      const book = await this.bookRepository.findBookById(id);
      if (!book) {
        return new NotFoundException("book");
      }
      const deleteBook = await this.bookRepository.deleteBook(id);
      return { data: deleteBook, status: "success" };
    } catch (error) {
      return new InternalServerException();
    }
  }
}
