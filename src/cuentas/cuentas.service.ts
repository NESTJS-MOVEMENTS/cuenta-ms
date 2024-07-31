import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { CreateCuentaDto } from './dto/create-cuenta.dto';
//import { UpdateCuentaDto } from './dto/update-cuenta.dto';
import { PrismaClient, TipoMovimiento } from '@prisma/client';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';
import { catchError, lastValueFrom } from 'rxjs';
import { Cliente } from './interfaces';
import { ChangeCuentaStatus } from './dto/change-cuenta-status.dto';
@Injectable()
export class CuentasService extends PrismaClient implements OnModuleInit {
  constructor(
    //? Via TCP
    //@Inject(CLIENTE_SERVICE) private readonly clienteClient: ClientProxy,
    //? Via NATS
    @Inject(NATS_SERVICE) private readonly clienteClient: ClientProxy,
  ) {
    super();
  }

  private readonly logger = new Logger('CuentasService');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Cuentas connected');
  }
  async create(createCuentaDto: CreateCuentaDto) {
    // const myObservable = from([1, 2, 3, 4, 5]);
    // const myPromise = lastValueFrom(myObservable);
    // myPromise.then((result) => console.log(result));

    // const myPromise = () => {
    //   return new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve('Hello, World!');
    //     }, 10000);
    //   });
    // };
    // const myObservable = from(myPromise());
    // myObservable.subscribe((result) => console.log(result));

    //? Buscamos la info en el microservicio Cliente
    //Usamos lastValueFrom para convertir el observable a una promesa de tipo Cliente y poder obtener los datos
    const datosClientes = await lastValueFrom<Cliente>(
      this.clienteClient
        .send(
          { cmd: 'find_one_cliente' },
          { identificacion: createCuentaDto.identificacion },
        )
        .pipe(
          //para atrapar el Rpc error message que viene desde el microservicio.
          catchError((error) => {
            throw new RpcException(error);
          }),
        ),
    );
    //SI no usamos lastValueFrom, datosClientes viene como un observable y tenemos que capturar los datos de la siguiente manera
    // let data: Cliente;
    // await datosClientes.forEach((dato) => {
    //   data = dato;
    // });

    //console.log(datosClientes);
    const cuenta = await this.cuenta.create({
      data: {
        ...createCuentaDto,
        cliente: datosClientes.nombre,
        movimientos: {
          create: {
            tipoMovimiento: TipoMovimiento.Deposito,
            valor: createCuentaDto.saldoInicial,
            saldo: createCuentaDto.saldoInicial,
            fecha: new Date(new Date().toISOString().split('T').at(0)),
            hora: new Date().toTimeString().split(' ').at(0),
          },
        },
      },
    });
    //console.log(cuenta);
    return cuenta;
  }

  findAll() {
    return `ok`;
  }

  async findOneById(id: number) {
    try {
      const cuenta = await this.cuenta.findUniqueOrThrow({ where: { id } });
      return cuenta;
    } catch (error) {
      throw new RpcException({
        message: `Cuenta #${id} no encontrada`,
        status: HttpStatus.NOT_FOUND,
      });
    }
  }

  // update(id: number, updateCuentaDto: UpdateCuentaDto) {
  //   return `This action updates a #${id} cuenta`;
  // }

  remove(id: number) {
    return `This action removes a #${id} cuenta`;
  }

  async changeStatusCuenta(changeCuentaStatus: ChangeCuentaStatus) {
    const { id, estado } = changeCuentaStatus;
    const cuenta = await this.findOneById(id);
    if (cuenta.estado === estado) return cuenta;

    return await this.cuenta.update({
      where: { id },
      data: { estado },
    });
  }
}
