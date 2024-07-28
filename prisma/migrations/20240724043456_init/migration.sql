-- CreateEnum
CREATE TYPE "TipoCuenta" AS ENUM ('Corriente', 'Ahorro');

-- CreateEnum
CREATE TYPE "TipoMovimiento" AS ENUM ('Retiro', 'Deposito');

-- CreateTable
CREATE TABLE "Cuenta" (
    "id" SERIAL NOT NULL,
    "cliente" TEXT NOT NULL,
    "saldoInicial" DOUBLE PRECISION NOT NULL,
    "tipoCuenta" "TipoCuenta" NOT NULL,
    "estado" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cuenta_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movimientos" (
    "id" SERIAL NOT NULL,
    "cuentaId" INTEGER,
    "tipoDeposito" "TipoMovimiento" NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "saldo" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Movimientos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Movimientos" ADD CONSTRAINT "Movimientos_cuentaId_fkey" FOREIGN KEY ("cuentaId") REFERENCES "Cuenta"("id") ON DELETE SET NULL ON UPDATE CASCADE;
