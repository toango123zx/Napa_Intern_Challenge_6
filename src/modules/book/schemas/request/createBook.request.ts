import "reflect-metadata";

import {
  extendZodWithOpenApi,
  ZodRequestBody,
} from "@asteasolutions/zod-to-openapi";
import { Transform, Type } from "class-transformer";
import { IsDate, IsInt, IsNotEmpty, IsString, Min } from "class-validator";

import { z } from "zod";
extendZodWithOpenApi(z);

export class CreateBookRequestDto {
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  description: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  author: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  published_date: Date;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  genre: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  summary: string;

  @IsInt()
  @Type(() => Number)
  @IsNotEmpty()
  @Min(1)
  quantity: number;
}

const CreateBookSchema = z.object({
  title: z.string().trim(),
  description: z.string().trim(),
  author: z.string().trim(),
  published_date: z.date(),
  genre: z.string().trim(),
  summary: z.string().trim(),
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
