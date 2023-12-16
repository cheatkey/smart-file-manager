/*
  Warnings:

  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `groupId` on the `File` table. All the data in the column will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Group";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_File" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "storedName" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL,
    "fileName" TEXT NOT NULL,
    "metadata" TEXT NOT NULL,
    "memo" TEXT NOT NULL,
    "thumbnails" TEXT,
    "history" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL
);
INSERT INTO "new_File" ("createdAt", "extension", "fileName", "fileSize", "history", "id", "memo", "metadata", "rating", "storedName", "thumbnails") SELECT "createdAt", "extension", "fileName", "fileSize", "history", "id", "memo", "metadata", "rating", "storedName", "thumbnails" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
