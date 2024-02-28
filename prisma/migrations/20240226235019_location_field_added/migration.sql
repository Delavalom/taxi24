/*
  Warnings:

  - Added the required column `location` to the `drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `passengers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "location" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "passengers" ADD COLUMN     "location" TEXT NOT NULL;
