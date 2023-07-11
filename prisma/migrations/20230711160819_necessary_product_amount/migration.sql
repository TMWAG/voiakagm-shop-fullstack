/*
  Warnings:

  - Made the column `amount` on table `products` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "products" ALTER COLUMN "amount" SET NOT NULL;
