-- DropForeignKey
ALTER TABLE "Track" DROP CONSTRAINT "Track_favoriteId_fkey";

-- CreateTable
CREATE TABLE "_FavTracks" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_FavTracks_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_FavTracks_B_index" ON "_FavTracks"("B");

-- AddForeignKey
ALTER TABLE "_FavTracks" ADD CONSTRAINT "_FavTracks_A_fkey" FOREIGN KEY ("A") REFERENCES "Favs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavTracks" ADD CONSTRAINT "_FavTracks_B_fkey" FOREIGN KEY ("B") REFERENCES "Track"("id") ON DELETE CASCADE ON UPDATE CASCADE;
