/*
  Warnings:

  - Added the required column `rating` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "openDate" DATETIME NOT NULL,
    "fileId" INTEGER,
    CONSTRAINT "Activity_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

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
    "rating" INTEGER NOT NULL,
    CONSTRAINT "File_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "File_historyId_fkey" FOREIGN KEY ("historyId") REFERENCES "History" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_File" ("createdAt", "extension", "fileName", "fileSize", "groupId", "historyId", "id", "memo", "metadata", "storedName", "thumbnails") SELECT "createdAt", "extension", "fileName", "fileSize", "groupId", "historyId", "id", "memo", "metadata", "storedName", "thumbnails" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
