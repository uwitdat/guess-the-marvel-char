/*
  Warnings:

  - You are about to drop the column `description` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `marvelId` on the `Character` table. All the data in the column will be lost.
  - Added the required column `firstAppearance` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `publisher` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sprite` to the `Character` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" DROP COLUMN "description",
DROP COLUMN "marvelId",
ADD COLUMN     "firstAppearance" VARCHAR(255) NOT NULL,
ADD COLUMN     "fullName" VARCHAR(255) NOT NULL,
ADD COLUMN     "publisher" VARCHAR(255) NOT NULL,
ADD COLUMN     "sprite" TEXT NOT NULL;
