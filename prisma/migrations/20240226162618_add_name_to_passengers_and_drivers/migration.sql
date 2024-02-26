/*
  Warnings:

  - Added the required column `name` to the `drivers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `passengers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "drivers" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "passengers" ADD COLUMN     "name" TEXT NOT NULL;
