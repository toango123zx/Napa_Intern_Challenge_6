import { IsInt, IsOptional, IsPositive } from "class-validator";
import { Type } from "class-transformer";
import { GetApiConfig } from "../../configs";

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  page: number = GetApiConfig.defaultPage;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  limit: number = GetApiConfig.defaultLimitPage;
}
