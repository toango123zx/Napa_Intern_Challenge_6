import "reflect-metadata";

import {
  extendZodWithOpenApi,
  ZodRequestBody,
} from "@asteasolutions/zod-to-openapi";
import { Transform, Type } from "class-transformer";
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from "class-validator";

import { z } from "zod";
extendZodWithOpenApi(z);

export class UpdateBookRequestDto {
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  title: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  description: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  author: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  published_date: Date;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  genre: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  summary: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(1)
  quantity: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  status: string;
}

const UpdateBookSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  author: z.string().optional(),
  published_date: z.date().optional(),
  genre: z.string().optional(),
  summary: z.string().optional(),
  quantity: z.number().optional(),
});

export const BodyUpdateBookRequestDtoSchema: ZodRequestBody = {
  description: "Create a new list",
  content: {
    "application/json": {
      schema: UpdateBookSchema,
    },
  },
};

export const UpdateBookRequestDtoSchema = z.object({
  param: z.object({
    id: z.string().cuid(),
  }),
});
