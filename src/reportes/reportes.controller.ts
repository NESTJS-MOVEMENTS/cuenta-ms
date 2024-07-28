import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ReportesService } from './reportes.service';
import { ParamsReporte } from './dto/params-reporte.dto';
// import { CreateReporteDto } from './dto/create-reporte.dto';
// import { UpdateReporteDto } from './dto/update-reporte.dto';

@Controller()
export class ReportesController {
  constructor(private readonly reportesService: ReportesService) {}

  @MessagePattern({ cmd: 'reporteMovimientos' })
  findMovimientos(@Payload() parametros: ParamsReporte) {
    return this.reportesService.findMovimientos(parametros);
  }

  // @MessagePattern('updateReporte')
  // update(@Payload() updateReporteDto: UpdateReporteDto) {
  //   return this.reportesService.update(updateReporteDto.id, updateReporteDto);
  // }
}
