-- CreateTable
CREATE TABLE "mileStones" (
    "id" SERIAL NOT NULL,
    "year" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "mileStones_pkey" PRIMARY KEY ("id")
);
