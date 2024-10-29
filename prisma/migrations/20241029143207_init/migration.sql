-- CreateTable
CREATE TABLE "FeaturedProduct" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "FeaturedProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feature" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "featuredProductId" TEXT NOT NULL,

    CONSTRAINT "Feature_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feature" ADD CONSTRAINT "Feature_featuredProductId_fkey" FOREIGN KEY ("featuredProductId") REFERENCES "FeaturedProduct"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
