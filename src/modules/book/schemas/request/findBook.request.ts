import { extendZodWithOpenApi } from "@asteasolutions/zod-to-openapi";
import { z } from "zod";
extendZodWithOpenApi(z);

export const FindBookRequestDtoSchema = z.object({
  param: z.object({
    id: z.string().cuid(),
  }),
});
