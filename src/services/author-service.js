const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addAuthor(name) {
  try {
    const newlyCreatedAuthor = await prisma.author.create({
      data: {
        name,
      },
    })
    return newlyCreatedAuthor
  } catch (error) {
    console.error('Error creating book', error)
  }
}

async function deleteAuthor(id) {
  try {
    const deletedAuthor = await prisma.author.delete({
      where: { id },
      include: { books: true },
    })
    return deletedAuthor
  } catch (error) {
    console.error('Error creating book', error.message)
    throw new Error('Error creating book', error.message)
  }
}
module.exports = { addAuthor, deleteAuthor }
