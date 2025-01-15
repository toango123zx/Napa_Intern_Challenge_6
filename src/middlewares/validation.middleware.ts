import "reflect-metadata";

import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { Request, Response, NextFunction } from "express";

export const validationMiddleware = (
  dto: any,
  source: "body" | "query" | "params" = "body"
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      // Lấy dữ liệu từ nguồn (body, query, params)
      const data = req[source];

      // Chuyển đổi dữ liệu thành đối tượng class
      const object = plainToClass(dto, data);

      // Validate dữ liệu
      const errors = await validate(object);

      if (errors.length > 0) {
        // Trả về lỗi nếu validate thất bại
        res.status(400).json({
          status: "err",
          message: `Validation ${errors[0].property} failed`,
          // errors: errors.map((err) => ({
          //   property: err.property,
          //   constraints: err.constraints,
          // })),
        });
        return; // Dừng luồng xử lý sau khi gửi response
      }

      // Nếu validate thành công, tiếp tục tới middleware/controller kế tiếp
      req[source] = object; // Cập nhật dữ liệu đã validate
      next(); // Chuyển sang middleware/controller kế tiếp
    } catch (err) {
      console.error(err);
      res.status(500).json({
        message: "Internal Server Error",
        error: (err as Error).message,
      });
    }
  };
};
