import prisma from "../prismaInit.js"

export const getUser = async (req, res) => {

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: req.params.email
      },

    })
    res.status(200).send({ 'success': true, 'data': user })
  } catch (err) {
    res.status(500).send({ 'success': false, 'errorMessage': err.message })
  }
}




export const createUser = async (req, res) => {
  try {
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        userName: req.body.userName,
      },
    })
    res.status(200).send({ 'success': true, 'data': user })
  } catch (err) {
    res.status(500).send({ 'success': false, 'errorMessage': err.message })
  }
}