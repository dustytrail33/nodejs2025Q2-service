/*
  Warnings:

  - You are about to drop the `_FavTracks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FavTracks" DROP CONSTRAINT "_FavTracks_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavTracks" DROP CONSTRAINT "_FavTracks_B_fkey";

-- DropTable
DROP TABLE "_FavTracks";

-- AddForeignKey
ALTER TABLE "Track" ADD CONSTRAINT "Track_favoriteId_fkey" FOREIGN KEY ("favoriteId") REFERENCES "Favs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
