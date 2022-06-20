-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "timesVotedCorrectly" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "timesVotedOn" INTEGER NOT NULL DEFAULT 0;
