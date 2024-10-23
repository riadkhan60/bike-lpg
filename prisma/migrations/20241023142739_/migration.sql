/*
  Warnings:

  - Added the required column `offerPrice` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "offerPrice" DOUBLE PRECISION NOT NULL;
