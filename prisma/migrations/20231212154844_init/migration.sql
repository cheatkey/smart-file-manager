/*
  Warnings:

  - You are about to drop the column `historyName` on the `History` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_History" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "version" INTEGER NOT NULL
);
INSERT INTO "new_History" ("id", "version") SELECT "id", "version" FROM "History";
DROP TABLE "History";
ALTER TABLE "new_History" RENAME TO "History";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
