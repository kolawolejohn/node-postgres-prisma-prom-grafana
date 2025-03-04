const bookService = require('../services/book-service')

exports.addBook = async (req, res) => {
  try {
    const { title, published_at, author_id } = req.body
    const book = await bookService.addBook(title, published_at, author_id)
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      book,
    })
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
}

exports.getAllbooks = async (req, res) => {
  try {
    const books = await bookService.getAllbooks()
    res.status(200).json({
      success: true,
      message: 'Books fetched successfully',
      books,
    })
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
}

exports.getBookById = async (req, res, id) => {
  try {
    const { id } = req.params
    const book = await bookService.getBookById(id)
    res.status(200).json({
      success: true,
      message: 'Book fetched successfully',
      book,
    })
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
}

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params
    const { title } = req.body
    const bookToUpdate = await bookService.updateBook(id, title)
    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      bookToUpdate,
    })
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
}

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params
    await bookService.deleteBook(id)
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
    })
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
}
