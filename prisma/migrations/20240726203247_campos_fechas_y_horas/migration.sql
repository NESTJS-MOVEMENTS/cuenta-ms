/*
  Warnings:

  - Added the required column `fecha` to the `Movimientos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora` to the `Movimientos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movimientos" ADD COLUMN     "fecha" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "hora" TEXT NOT NULL;
