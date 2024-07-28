import { HttpStatus, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { CreateMovimientoDto } from './dto/create-movimiento.dto';
import { PrismaClient } from '@prisma/client';
import { CuentasService } from 'src/cuentas/cuentas.service';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class MovimientosService extends PrismaClient implements OnModuleInit {
  constructor(private readonly cuentaServices: CuentasService) {
    super();
  }

  private readonly logger = new Logger('MovimientosService');
  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }

  async create(createMovimientoDto: CreateMovimientoDto) {
    const { cuentaId, tipoMovimiento, valor } = createMovimientoDto;

    //Todo: Validar Cuenta si la cuenta existe
    await this.cuentaServices.findOneById(cuentaId);
    //Todo: Obtener la ultima transaccion de una cuenta ya que ese registro tiene el saldo disponible.
    //Como es un findMany devueve un array
    const lastTrx = await this.movimientos.findMany({
      where: { cuentaId: cuentaId },
      orderBy: { id: 'desc' },
      take: 1,
    });

    //Todo: Validar el saldo disponible
    if (tipoMovimiento === 'Retiro' && valor > lastTrx[0].saldo) {
      throw new RpcException({
        message: `Saldo no disponible`,
        status: HttpStatus.BAD_REQUEST,
      });
    }

    //Todo: Grabar la transaccion
    //!Esta es una manera de grabar un movimiento pero devuelve los datos de la cuenta mas todos los movimientos relacionados
    // const movimiento = await this.cuenta.update({
    //   where: { id: cuentaId },
    //   data: {
    //     movimientos: {
    //       create: {
    //         tipoMovimiento: tipoMovimiento,
    //         valor: tipoMovimiento === 'Deposito' ? valor : -valor,
    //         saldo:
    //           tipoMovimiento === 'Deposito'
    //             ? lastTrx[0].saldo + valor
    //             : lastTrx[0].saldo - valor,
    //       },
    //     },
    //   },
    //   include: { movimientos: true },
    // });

    const movimiento = await this.movimientos.create({
      data: {
        tipoMovimiento: tipoMovimiento,
        valor: tipoMovimiento === 'Deposito' ? valor : -valor,
        saldo:
          tipoMovimiento === 'Deposito'
            ? lastTrx[0].saldo + valor
            : lastTrx[0].saldo - valor,
        //cuentaId: cuentaId,
        cuenta: {
          connect: { id: cuentaId },
        },
        fecha: new Date(new Date().toISOString().split('T').at(0)),
        hora: new Date().toTimeString().split(' ').at(0),
      },
    });
    console.log(movimiento);
    return movimiento;
  }

  findAll() {
    return `This action returns all movimientos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} movimiento`;
  }
}
