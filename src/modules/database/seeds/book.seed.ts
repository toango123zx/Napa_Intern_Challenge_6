import { Prisma } from "../index";
import { PrismaService } from "../prisma.service";

const prismaService = new PrismaService();

export const bookSeedData = async () => {
  const prismaService = new PrismaService();

  const books: Prisma.BookCreateInput[] = [];

  for (let i = 0; i < 100; i++) {
    const book: Prisma.BookCreateInput = {
      title: `Book ${i}`,
      description: `Description ${i}`,
      author: `Author ${i}`,
      genre: `Genre ${i}`,
      published_date: new Date(),
      quantity: 10,
      summary: "Summary",
      status: "available",
    };
    books.push(book);
  }

  await prismaService.book.createMany({ data: books });
  console.log("Books created");
};
