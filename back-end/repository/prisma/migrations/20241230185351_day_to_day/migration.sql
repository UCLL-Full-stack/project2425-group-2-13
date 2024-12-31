/*
  Warnings:

  - You are about to drop the column `Day` on the `Tour` table. All the data in the column will be lost.
  - Added the required column `day` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "Day",
ADD COLUMN     "day" TIMESTAMP(3) NOT NULL;
