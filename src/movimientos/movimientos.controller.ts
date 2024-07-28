import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MovimientosService } from './movimientos.service';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';

@Controller()
export class MovimientosController {
  constructor(private readonly movimientosService: MovimientosService) {}

  @MessagePattern({ cmd: 'registraMovimiento' })
  async create(@Payload() createMovimientoDto: CreateMovimientoDto) {
    return await this.movimientosService.create(createMovimientoDto);
  }

  @MessagePattern('findAllMovimientos')
  findAll() {
    return this.movimientosService.findAll();
  }

  @MessagePattern('findOneMovimiento')
  findOne(@Payload() id: number) {
    return this.movimientosService.findOne(id);
  }
}
