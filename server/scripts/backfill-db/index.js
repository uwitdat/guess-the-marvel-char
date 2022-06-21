import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const backFill = async (req, res) => {
  try {
    await prisma.Character.createMany({
      data: req.body
    })
    res.status(201).send({ 'success': true, 'data': 'success' })
  } catch (err) {
    res.status(500).send({ 'success': true, 'errorMesssage': err.message })
  }
}
