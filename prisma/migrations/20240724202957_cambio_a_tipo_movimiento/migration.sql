/*
  Warnings:

  - You are about to drop the column `tipoDeposito` on the `Movimientos` table. All the data in the column will be lost.
  - Added the required column `tipoMovimiento` to the `Movimientos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movimientos" DROP COLUMN "tipoDeposito",
ADD COLUMN     "tipoMovimiento" "TipoMovimiento" NOT NULL;
