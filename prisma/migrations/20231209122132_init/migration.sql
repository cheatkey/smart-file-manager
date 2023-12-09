/*
  Warnings:

  - You are about to drop the `Thumbnail` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `extension` to the `File` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileSize` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Thumbnail";
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
    "groupId" INTEGER,
    "historyId" INTEGER,
    "extension" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    CONSTRAINT "File_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "File_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_File" ("createdAt", "fileName", "groupId", "historyId", "id", "memo", "metadata", "storedName") SELECT "createdAt", "fileName", "groupId", "historyId", "id", "memo", "metadata", "storedName" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
