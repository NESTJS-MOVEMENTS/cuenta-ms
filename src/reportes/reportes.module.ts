import { Module } from '@nestjs/common';
import { ReportesService } from './reportes.service';
import { ReportesController } from './reportes.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CLIENTE_SERVICE, envs } from 'src/config';

@Module({
  controllers: [ReportesController],
  providers: [ReportesService],
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
export class ReportesModule {}
