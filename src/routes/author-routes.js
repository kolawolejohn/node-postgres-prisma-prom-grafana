const express = require('express')
const { addAuthor, deleteAuthor } = require('../controllers/author-controller')

const router = express.Router()

router.post('/', addAuthor)
router.delete('/:id', deleteAuthor)

module.exports = router
