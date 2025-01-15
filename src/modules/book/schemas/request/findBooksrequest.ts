import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

export const FindBooksRequestDtoSchema = z.object({
  query: z.object({
    page: z.number(),
    limit: z.number(),
  }),
});
