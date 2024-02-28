/*
  Warnings:

  - You are about to drop the column `driverId` on the `trips` table. All the data in the column will be lost.
  - You are about to drop the column `passengerId` on the `trips` table. All the data in the column will be lost.
  - Added the required column `driver_id` to the `trips` table without a default value. This is not possible if the table is not empty.
  - Added the required column `passenger_id` to the `trips` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_driverId_fkey";

-- DropForeignKey
ALTER TABLE "trips" DROP CONSTRAINT "trips_passengerId_fkey";

-- AlterTable
ALTER TABLE "trips" DROP COLUMN "driverId",
DROP COLUMN "passengerId",
ADD COLUMN     "driver_id" INTEGER NOT NULL,
ADD COLUMN     "passenger_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_passenger_id_fkey" FOREIGN KEY ("passenger_id") REFERENCES "passengers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_driver_id_fkey" FOREIGN KEY ("driver_id") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
