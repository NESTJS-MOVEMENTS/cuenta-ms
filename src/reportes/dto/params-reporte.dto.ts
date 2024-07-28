import { Type } from 'class-transformer';
import { IsDate, IsString } from 'class-validator';

export class ParamsReporte {
  @IsDate()
  @Type(() => Date)
  public desde: Date;
  @IsDate()
  @Type(() => Date)
  public hasta: Date;
  @IsString()
  public identificacion: string;
}
