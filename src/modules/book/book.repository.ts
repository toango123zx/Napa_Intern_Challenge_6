import { Book, Prisma } from "@prisma/client";
import { PrismaService } from "../database";

export class BookRepsitory {
  constructor(private readonly prismaService = new PrismaService()) {}

  async findAll(skip: number, take: number): Promise<[Book[], number]> {
    try {
      const [books, totalRecords] = await Promise.all([
        this.prismaService.book.findMany({
          where: {
            status: "available",
          },
          skip: skip,
          take: take,
        }),
        this.prismaService.book.count({
          where: {
            status: "available",
          },
        }),
      ]);
      return [books, totalRecords];
    } catch (error) {
      throw error;
    }
  }

  async findBookById(id: string): Promise<Book | null> {
    try {
      return await this.prismaService.book.findUnique({
        where: {
          id: id,
          status: "available",
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async createBook(data: Prisma.BookCreateInput): Promise<Book> {
    try {
      return await this.prismaService.book.create({
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateBook(id: string, data: Prisma.BookUpdateInput): Promise<Book> {
    try {
      return await this.prismaService.book.update({
        where: {
          id: id,
        },
        data: data,
      });
    } catch (error) {
      throw error;
    }
  }

  async deleteBook(id: string): Promise<Book> {
    try {
      return await this.prismaService.book.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
