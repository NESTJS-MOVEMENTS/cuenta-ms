import { Module } from '@nestjs/common';
import { CuentasService } from './cuentas.service';
import { CuentasController } from './cuentas.controller';
import { NatsModule } from '../nats/nats.module';
@Module({
  controllers: [CuentasController],
  providers: [CuentasService],
  exports: [CuentasService],
  //Es necesario el nats module porque hay que cosultar si el cliente existe en el microservicio de clientes. Nats module sera inyectado en el servicio.
  imports: [NatsModule],
})
export class CuentasModule {}
