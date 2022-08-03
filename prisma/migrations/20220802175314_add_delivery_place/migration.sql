/*
  Warnings:

  - Added the required column `delivery_place` to the `deliveries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "deliveries" ADD COLUMN     "delivery_place" TEXT NOT NULL;
