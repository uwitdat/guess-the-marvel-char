import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const increaseOneTotal = async (req, res) => {
  const { id } = req.params;

  try {
    const editedChar = await prisma.character.update({
      where: {
        id: Number(id)
      },
      data: {
        timesVotedOn: req.body.newTotal
      }
    })

    res.status(200).send({ 'success': true, 'data': editedChar })
  } catch (err) {
    res.status(500).send({ 'success': false, 'errorMessage': err.message })
  }


}

export const increaseBothTotals = async (req, res) => {
  const { id } = req.params;


  try {
    const editedChar = await prisma.character.update({
      where: {
        id: Number(id)
      },
      data: {
        timesVotedOn: req.body.newTotal,
        timesVotedCorrectly: req.body.newCorrectTotal
      }
    })

    res.status(200).send({ 'success': true, 'data': editedChar })
  } catch (err) {
    res.status(500).send({ 'success': false, 'errorMessage': err.message })
  }

}