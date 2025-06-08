/*
  Warnings:

  - You are about to drop the `Favorite` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Album" DROP CONSTRAINT "Album_favoriteId_fkey";

-- DropForeignKey
ALTER TABLE "Artist" DROP CONSTRAINT "Artist_favoriteId_fkey";

-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favoriteId_fkey";

-- DropTable
DROP TABLE "Favorite";

-- CreateTable
CREATE TABLE "Favs" (
    "id" TEXT NOT NULL,

    CONSTRAINT "Favs_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Album" ADD CONSTRAINT "Album_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Artist" ADD CONSTRAINT "Artist_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favs"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
