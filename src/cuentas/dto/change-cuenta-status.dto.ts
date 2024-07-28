import { IsBoolean, IsNumber, IsPositive } from 'class-validator';

export class ChangeCuentaStatus {
  //Numero de cuenta
  @IsNumber()
  @IsPositive()
  public id: number;
  //Estado de la cuenta
  @IsBoolean()
  public estado: boolean;
}
