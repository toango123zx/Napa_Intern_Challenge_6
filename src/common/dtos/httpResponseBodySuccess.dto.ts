import { z } from "zod";

export interface HttpResponseBodySuccessDto<T> {
  status: string;
  data: T;
  pagination?: PaginationDto;
}

interface PaginationDto {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  totalPages: number;
}

export const HttpResponseBodySuccessDtoSchema = <T extends z.ZodTypeAny>(
  dataSchema: T | null
) =>
  z.object({
    status: z.string(),
    data: dataSchema ? dataSchema.optional() : z.null(),
    totalPage: z.number(),
    pagination: z.object({
      totalItems: z.number(),
      itemsPerPage: z.number(),
      currentPage: z.number(),
      totalPages: z.number(),
    }),
  });
