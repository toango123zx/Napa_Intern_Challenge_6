import {
  extendZodWithOpenApi,
  ZodRequestBody,
} from "@asteasolutions/zod-to-openapi";
import { Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

import { z } from "zod";
extendZodWithOpenApi(z);

export class CreateBookRequestDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  published_date: Date;

  @IsString()
  @IsNotEmpty()
  genre: string;

  @IsString()
  @IsNotEmpty()
  summary: string;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}

const CreateBookSchema = z.object({
  title: z.string(),
  description: z.string(),
  author: z.string(),
  published_date: z.date(),
  genre: z.string(),
  summary: z.string(),
  quantity: z.number(),
});

export const BodyCreateBookRequestDtoSchema: ZodRequestBody = {
  description: "Create a new list",
  content: {
    "application/json": {
      schema: CreateBookSchema,
    },
  },
};
