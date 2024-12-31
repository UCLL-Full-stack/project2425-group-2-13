/*
  Warnings:

  - You are about to drop the column `days` on the `Tour` table. All the data in the column will be lost.
  - Added the required column `Day` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Tour` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number_of_participants` to the `Tour` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Tour" DROP CONSTRAINT "Tour_guide_id_fkey";

-- AlterTable
ALTER TABLE "Tour" DROP COLUMN "days",
ADD COLUMN     "Day" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "number_of_participants" INTEGER NOT NULL,
ALTER COLUMN "level" SET DATA TYPE TEXT;
