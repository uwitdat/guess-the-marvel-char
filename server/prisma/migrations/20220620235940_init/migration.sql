-- CreateTable
CREATE TABLE "Character" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255),
    "marvelId" INTEGER NOT NULL,
    "description" TEXT,
    "timesVotedOn" INTEGER NOT NULL DEFAULT 0,
    "timesVotedCorrectly" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Character_pkey" PRIMARY KEY ("id")
);
