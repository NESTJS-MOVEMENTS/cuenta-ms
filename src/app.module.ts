import { Module } from '@nestjs/common';
import { CuentasModule } from './cuentas/cuentas.module';
import { MovimientosModule } from './movimientos/movimientos.module';
import { ReportesModule } from './reportes/reportes.module';

@Module({
  imports: [CuentasModule, MovimientosModule, ReportesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
