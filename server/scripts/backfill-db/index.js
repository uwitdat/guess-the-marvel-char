import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const backFill = async (req, res) => {
    const { data } = req.body;
    formatAndSaveData(data)

}

const formatAndSaveData = async (res) => {

    const marvelChars = res.map((r) => {
        return {
            name: r.name,
            sprite: r.sprite,
            firstAppearance: r.firstAppearance,
            fullName: r.fullName,
            publisher: r.publisher
        }
    })

    try {
        await prisma.Character.createMany({
            data: marvelChars
        })
        console.log('success')
    } catch (err) {
        console.log(err.message)
    }
}

