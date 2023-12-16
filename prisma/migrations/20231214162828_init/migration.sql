-- CreateTable
CREATE TABLE "Group" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "groupName" TEXT NOT NULL
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
    "history" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,
    CONSTRAINT "File_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_File" ("createdAt", "extension", "fileName", "fileSize", "history", "id", "memo", "metadata", "rating", "storedName", "thumbnails") SELECT "createdAt", "extension", "fileName", "fileSize", "history", "id", "memo", "metadata", "rating", "storedName", "thumbnails" FROM "File";
DROP TABLE "File";
ALTER TABLE "new_File" RENAME TO "File";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
