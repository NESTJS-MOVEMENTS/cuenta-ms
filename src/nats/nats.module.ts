import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from 'src/config';

@Module({
  imports: [
    ClientsModule.register([
      {
        //? COnfiguracion via TCP
        // name: CLIENTE_SERVICE,
        // transport: Transport.TCP,
        // options: {
        //   host: envs.clientesMicroserviceHost,
        //   port: envs.clientesMicroservicePort,
        // },
        //? COnfiguracion via NATS
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natServers,
        },
      },
    ]),
  ],
  //? Para que funcione hay que exportar lo mismo de import
  exports: [
    ClientsModule.register([
      {
        //? COnfiguracion via TCP
        // name: CLIENTE_SERVICE,
        // transport: Transport.TCP,
        // options: {
        //   host: envs.clientesMicroserviceHost,
        //   port: envs.clientesMicroservicePort,
        // },
        //? COnfiguracion via NATS
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: {
          servers: envs.natServers,
        },
      },
    ]),
  ],
})
export class NatsModule {}
