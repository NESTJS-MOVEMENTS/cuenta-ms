import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CuentasService } from './cuentas.service';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
import { ChangeCuentaStatus } from './dto/change-cuenta-status.dto';
//import { UpdateCuentaDto } from './dto/update-cuenta.dto';

@Controller()
export class CuentasController {
  constructor(private readonly cuentasService: CuentasService) {}

  @MessagePattern({ cmd: 'createCuenta' })
  async create(@Payload() createCuentaDto: CreateCuentaDto) {
    return await this.cuentasService.create(createCuentaDto);
  }

  @MessagePattern('findAllCuentas')
  findAll() {
    return this.cuentasService.findAll();
  }

  @MessagePattern({ cmd: 'findOneCuentaById' })
  async findOneById(@Payload('id') id: number) {
    return await this.cuentasService.findOneById(id);
  }

  // @MessagePattern('updateCuenta')
  // update(@Payload() updateCuentaDto: UpdateCuentaDto) {
  //   return this.cuentasService.update(updateCuentaDto.id, updateCuentaDto);
  // }

  @MessagePattern('removeCuenta')
  remove(@Payload() id: number) {
    return this.cuentasService.remove(id);
  }
  @MessagePattern({ cmd: 'changeCuentaStatus' })
  async changeCuentaStatus(@Payload() changeCuentaStatus: ChangeCuentaStatus) {
    return await this.cuentasService.changeStatusCuenta(changeCuentaStatus);
  }
}
