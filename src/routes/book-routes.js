const express = require('express')
const {
  addBook,
  getAllbooks,
  getBookById,
  updateBook,
  deleteBook,
} = require('../controllers/book-controller')

const router = express.Router()

router.post('/', addBook)
router.get('/', getAllbooks)
router.get('/:id', getBookById)
router.patch('/:id', updateBook)
router.delete('/:id', deleteBook)

module.exports = router
