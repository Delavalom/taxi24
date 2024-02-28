/*
  Warnings:

  - Added the required column `trip_id` to the `bills` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bills" ADD COLUMN     "trip_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "bills" ADD CONSTRAINT "bills_trip_id_fkey" FOREIGN KEY ("trip_id") REFERENCES "trips"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
