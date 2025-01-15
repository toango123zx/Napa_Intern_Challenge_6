import { z } from "zod";

export interface HttpResponseBodySuccessDto<T> {
  status: string;
  data: T;
  totalPage?: Number;
}

export const HttpResponseBodySuccessDtoSchema = <T extends z.ZodTypeAny>(
  dataSchema: T | null
) =>
  z.object({
    status: z.string(),
    data: dataSchema ? dataSchema.optional() : z.null(),
    totalPage: z.number(),
  });
