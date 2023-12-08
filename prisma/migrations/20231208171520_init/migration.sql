/*
  Warnings:

  - You are about to drop the column `image` on the `Thumbnail` table. All the data in the column will be lost.
  - Added the required column `imagePath` to the `Thumbnail` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Thumbnail" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imagePath" TEXT NOT NULL,
    "fileId" INTEGER NOT NULL,
    CONSTRAINT "Thumbnail_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Thumbnail" ("fileId", "id") SELECT "fileId", "id" FROM "Thumbnail";
DROP TABLE "Thumbnail";
ALTER TABLE "new_Thumbnail" RENAME TO "Thumbnail";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
