/*
  Warnings:

  - Added the required column `vandor_picture` to the `vendors` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vendors" ADD COLUMN     "vandor_picture" TEXT NOT NULL;
