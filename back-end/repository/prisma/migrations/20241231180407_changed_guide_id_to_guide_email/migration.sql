/*
  Warnings:

  - You are about to drop the column `guide_id` on the `Tour` table. All the data in the column will be lost.
  - Added the required column `guide_email` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "guide_id",
ADD COLUMN     "guide_email" TEXT NOT NULL;
