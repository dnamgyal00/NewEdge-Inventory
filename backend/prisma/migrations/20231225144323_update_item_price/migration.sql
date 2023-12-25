/*
  Warnings:

  - You are about to drop the column `price` on the `StockIn` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `StockOut` table. All the data in the column will be lost.
  - Added the required column `unit_price` to the `Item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Item" ADD COLUMN     "unit_price" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "StockIn" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "StockOut" DROP COLUMN "price";
