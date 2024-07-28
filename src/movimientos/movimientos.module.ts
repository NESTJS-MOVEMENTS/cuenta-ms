import { Module } from '@nestjs/common';
import { MovimientosService } from './movimientos.service';
import { MovimientosController } from './movimientos.controller';
import { CuentasModule } from 'src/cuentas/cuentas.module';

@Module({
  controllers: [MovimientosController],
  providers: [MovimientosService],
  imports: [CuentasModule],
})
export class MovimientosModule {}
