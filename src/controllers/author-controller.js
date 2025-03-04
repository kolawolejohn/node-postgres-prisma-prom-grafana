const authorService = require('../services/author-service')

exports.addAuthor = async (req, res) => {
  try {
    const { name } = req.body
    const author = await authorService.addAuthor(name)
    res.status(201).json({
      sussess: true,
      message: 'Author created successfully',
      author,
    })
  } catch (error) {
    res.status(400).json({
      error: error.message,
    })
  }
}

exports.deleteAuthor = async (req, res) => {
  try {
    const { id } = req.params
    await authorService.deleteAuthor(id)
    res.status(200).json({
      sussess: true,
      message: 'Author deleted  successfully',
    })
  } catch (error) {}
}
