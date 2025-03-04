const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addBook(title, published_at, authorId) {
  try {
    const newlyCreatedBook = await prisma.book.create({
      data: {
        title,
        published_at: new Date(published_at),
        author: { connect: { id: authorId } },
      },
      include: { author: true },
    })

    return newlyCreatedBook
  } catch (error) {
    console.error('Error creating book', error)
  }
}

async function getAllbooks() {
  try {
    const books = await prisma.book.findMany({
      include: { author: true },
    })
    console.log('Books fetched successfully')

    return books
  } catch (error) {
    console.error('Error fetching book', error)
    throw new Error(error)
  }
}

async function getBookById(id) {
  try {
    const book = await prisma.book.findUnique({
      where: { id },
      include: { author: true },
    })

    if (!book) {
      throw new Error(`Book with id ${id} not found`, error.message)
    }
    return book
  } catch (error) {
    console.error('Error fetching book', error.message)
    throw new Error(`Book with id ${id} not found`, error.message)
  }
}

async function updateBook(id, title) {
  try {
    // const book = await prisma.book.findUnique({
    //   where: { id },
    // })

    // if (!book) {
    //   throw new Error(`Book with id ${id} not found`, error.message)
    // }

    // const updatedBook = await prisma.book.update({
    //   where: { id: book.id },
    //   data: {
    //     title,
    //   },
    //   include: { author: true },
    // })

    // return updatedBook

    //using transactions
    const updatedBook = await prisma.$transaction(async (prisma) => {
      const book = await prisma.book.findUnique({ where: { id } })
      if (!book) {
        throw new Error(`Book with id ${id} not found`, error.message)
      }
      return await prisma.book.update({
        where: { id },
        data: {
          title,
        },
        include: { author: true },
      })
    })

    return updatedBook
  } catch (error) {
    throw new Error(`Book with id ${id} not found`, error.message)
  }
}

async function deleteBook(id) {
  try {
    const book = await prisma.book.findUnique({ where: { id } })
    if (!book) {
      throw new Error(`Book with id ${id} not found`, error.message)
    }
    return await prisma.book.delete({
      where: { id },
      include: { author: true },
    })
  } catch (error) {
    throw new Error(`Book with id ${id} not found`, error.message)
  }
}

module.exports = { addBook, getAllbooks, getBookById, updateBook, deleteBook }
