import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { NatsModule } from '../nats/nats.module';

@Module({
  controllers: [ReportesController],
  providers: [ReportesService],
  //Es necesario el nats module porque hay que cosultar si el cliente existe en el microservicio de clientes. Nats module sera inyectado en el servicio.
  imports: [NatsModule],
})
export class ReportesModule {}
