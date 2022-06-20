import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getRandomChar = async (req, res) => {
  const randomInt = getRandomInt();
  let data = {};

  const randomChar = await prisma.character.findUnique({
    where: {
      id: randomInt
    },
    select: {
      name: true,
      id: true,
      sprite: true,
      firstAppearance: true,
      timesVotedCorrectly: true,
      timesVotedOn: true,
      fullName: true,
      publisher: true
    },
  })

  const charsAgainst = await getCharsToGuessAgainst(randomInt);

  data.toGuess = randomChar;
  data.against = charsAgainst;

  res.send({ data: data })
}

function getRandomInt() {
  let min = Math.ceil(7);
  let max = Math.floor(579);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getCharsToGuessAgainst = async (int) => {
  let data = []

  let i = 4;

  while (i > 0) {
    const randomInt = getRandomInt();

    const randomChar = await prisma.character.findUnique({
      where: {
        id: randomInt
      },
      select: {
        name: true,
        id: true
      },
    })
    if (randomChar.id === int) {
      continue;
    } else {
      data.push(randomChar)
      i--
    }
  }

  return data;
}