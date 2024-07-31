import {
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ParamsReporte } from './dto/params-reporte.dto';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { NATS_SERVICE } from '../config';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class ReportesService extends PrismaClient implements OnModuleInit {
  constructor(
    // @Inject(CLIENTE_SERVICE) private readonly clienteClient: ClientProxy,
    @Inject(NATS_SERVICE) private readonly clienteClient: ClientProxy,
  ) {
    super();
  }
  private readonly logger = new Logger('MovimientosService');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database Reports connected');
  }
  // create(createReporteDto: CreateReporteDto) {
  //   return 'This action adds a new reporte';
  // }

  async findMovimientos(parametros: ParamsReporte) {
    const { desde, hasta, identificacion } = parametros;
    //console.log(desde);
    //console.log(new Date(hasta.setDate(hasta.getDate() + 1)));
    //? Validar que la fecha hasta sea mayor a fecha desde
    //console.log(desde.toISOString().split('T').at(0));
    if (hasta < desde) {
      throw new RpcException({
        message: `Fecha hasta desde de ser mayor a fecha desde `,
        status: HttpStatus.BAD_REQUEST,
      });
    }

    //?Buscar si existe cliente en el microservicio
    //Usamos lastValueFrom para convertir el observable a una promesa de tipo Cliente.Como solo necesitamos validar la existencia y no vamos a necesitar los datos solo usamos el await
    await lastValueFrom(
      this.clienteClient
        .send({ cmd: 'find_one_cliente' }, { identificacion: identificacion })
        .pipe(
          //para atrapar el Rpc error message que viene desde el microservicio.
          catchError((error) => {
            throw new RpcException(error);
          }),
        ),
    );

    //Todo consultar los movimientos en la BD.
    const movimientos = await this.cuenta.findMany({
      where: {
        identificacion,
      },
      include: {
        movimientos: {
          where: {
            createdAt: {
              gte: desde,
              //Siempre tiene que ser un dia mas al ingresado en el queryParam "hasta" y evualuada con el operador lt
              lt: new Date(hasta.setDate(hasta.getDate() + 1)),
            },
          },
        },
      },
    });

    if (movimientos.length === 0) {
      return {
        ok: false,
        movimientos,
      };
    }
    return {
      ok: true,
      movimientos,
    };
  }
}
