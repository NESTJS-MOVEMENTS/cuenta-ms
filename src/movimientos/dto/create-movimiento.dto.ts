import { IsEnum, IsInt, IsNumber, IsPositive, Min } from 'class-validator';

export enum TipoMovimiento {
  Retiro = 'Retiro',
  Deposito = 'Deposito',
}
export const TipoMovimientoList = [
  TipoMovimiento.Deposito,
  TipoMovimiento.Retiro,
];
export class CreateMovimientoDto {
  @IsInt()
  @IsPositive()
  public cuentaId: number;

  @IsEnum(TipoMovimientoList, {
    message: `tipoMovimiento: ${TipoMovimientoList.join(',')}`,
  })
  public tipoMovimiento: TipoMovimiento;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  @IsPositive()
  @Min(0.01)
  //Se usa @type() por que lso datos vienen como Strings cuando se usa x-www-form-urlencoded
  //@Type(() => Number)
  public valor: number;
}
