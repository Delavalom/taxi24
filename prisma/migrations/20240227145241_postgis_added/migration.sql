/*
  Warnings:

  - You are about to alter the column `location` on the `drivers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Unsupported("geometry(Point, 4326)")`.
  - You are about to alter the column `location` on the `passengers` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Unsupported("geometry(Point, 4326)")`.
  - You are about to alter the column `starting_point` on the `trips` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Unsupported("geometry(Point, 4326)")`.
  - You are about to alter the column `ending_point` on the `trips` table. The data in that column could be lost. The data in that column will be cast from `Text` to `Unsupported("geometry(Point, 4326)")`.

*/
-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis" WITH VERSION "3.4.2";

-- AlterTable
ALTER TABLE "drivers" ALTER COLUMN "location" SET DATA TYPE geometry(Point, 4326);

-- AlterTable
ALTER TABLE "passengers" ALTER COLUMN "location" SET DATA TYPE geometry(Point, 4326);

-- AlterTable
ALTER TABLE "trips" ALTER COLUMN "starting_point" SET DATA TYPE geometry(Point, 4326),
ALTER COLUMN "ending_point" SET DATA TYPE geometry(Point, 4326);

-- CreateIndex
CREATE INDEX "driver_location" ON "drivers" USING GIST ("location");

-- CreateIndex
CREATE INDEX "passenger_location" ON "passengers" USING GIST ("location");

-- CreateIndex
CREATE INDEX "starting_point" ON "trips" USING GIST ("starting_point");

-- CreateIndex
CREATE INDEX "ending_point" ON "trips" USING GIST ("ending_point");
