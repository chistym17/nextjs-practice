/*
  Warnings:

  - You are about to drop the column `firstname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `lastname` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_firstname_key";

-- DropIndex
DROP INDEX "User_lastname_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstname",
DROP COLUMN "lastname";
