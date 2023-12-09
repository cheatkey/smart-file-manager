/*
  Warnings:

  - You are about to drop the column `openDate` on the `Activity` table. All the data in the column will be lost.
  - Added the required column `content` to the `Activity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `date` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Activity" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "content" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "fileId" INTEGER,
    CONSTRAINT "Activity_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Activity" ("fileId", "id") SELECT "fileId", "id" FROM "Activity";
DROP TABLE "Activity";
ALTER TABLE "new_Activity" RENAME TO "Activity";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
