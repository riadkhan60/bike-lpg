/*
  Warnings:

  - Added the required column `thumbnailUrl` to the `VideoLink` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "VideoLink" ADD COLUMN     "thumbnailUrl" TEXT NOT NULL;
