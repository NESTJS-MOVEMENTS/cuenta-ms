/*
  Warnings:

  - Added the required column `identificacion` to the `Cuenta` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Cuenta" ADD COLUMN     "identificacion" TEXT NOT NULL;
