import { Module } from '@nestjs/common';
import { CuentasService } from './cuentas.service';
import { CuentasController } from './cuentas.controller';
import { CLIENTE_SERVICE, envs } from 'src/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
@Module({
  controllers: [CuentasController],
  providers: [CuentasService],
  exports: [CuentasService],
  imports: [
    // ClientsModule.register......
    ClientsModule.register([
      {
        name: CLIENTE_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.clientesMicroserviceHost,
          port: envs.clientesMicroservicePort,
        },
      },
    ]),
  ],
})
export class CuentasModule {}
