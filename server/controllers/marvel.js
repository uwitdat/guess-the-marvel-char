import prisma from "../prismaInit.js";

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
      marvelId: true,
      description: true,
      timesVotedCorrectly: true,
      timesVotedOn: true,
    },
  })

  const charsAgainst = await getCharsToGuessAgainst(randomInt);

  data.toGuess = randomChar;
  data.against = charsAgainst;

  res.send({ success: true, data: data })
}

const MIN = 1
const MAX = 1562

function getRandomInt() {
  let min = Math.ceil(MIN);
  let max = Math.floor(MAX);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getCharsToGuessAgainst = async (int) => {
  let sameChars = {}
  sameChars[int] = true
  const chars = [];

  let i = 3;

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
    if (sameChars[randomChar.id]) {
      continue;
    } else {
      sameChars[randomChar.id] = true;
      chars.push(randomChar)
      i--
    }
  }

  return chars;
}