-- CreateTable
CREATE TABLE "trips" (
    "id" SERIAL NOT NULL,
    "passengerId" INTEGER NOT NULL,
    "driverId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ongoing',
    "starting_point" TEXT NOT NULL,
    "ending_point" TEXT NOT NULL,

    CONSTRAINT "trips_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "drivers" (
    "id" SERIAL NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',

    CONSTRAINT "drivers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "passengers" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "passengers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bills" (
    "id" SERIAL NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "paid" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "bills_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_passengerId_fkey" FOREIGN KEY ("passengerId") REFERENCES "passengers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "trips" ADD CONSTRAINT "trips_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "drivers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
