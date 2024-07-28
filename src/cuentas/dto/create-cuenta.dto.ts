import { TipoCuenta } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsPositive, IsString } from 'class-validator';

// export enum CuentaType {
//   Ahorro = 'Ahorro',
//   Corriente = 'Corriente',
// }
export const TipoCuentaList = [TipoCuenta.Ahorro, TipoCuenta.Corriente];
export class CreateCuentaDto {
  @IsString()
  public identificacion: string;
  @IsNumber({
    maxDecimalPlaces: 2,
  })
  //@Min(0)
  @IsPositive()
  @Type(() => Number)
  public saldoInicial: number;
  @IsEnum(TipoCuentaList, {
    message: `tipoCuenta: ${TipoCuentaList.join(',')}`,
  })
  public tipoCuenta: TipoCuenta;
}
