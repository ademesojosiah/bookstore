const bookModel = require('../models/books')



const getAllBooks = (req,res)=>{
    bookModel.find()
    .then(books => {
        res.status(200).json({nHbits:books.length, books})
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}

const getSingleBook =  (req, res) => {
    const id = req.params.id
    bookModel.findById(id)
        .then(book => {
            res.status(200).send(book)
        }).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
}

const addBook =  (req, res) => {
    const book = req.body
    book.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    bookModel.create(book)
        .then(book => {
            res.status(201).send(book)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

const updateBook =  (req, res) => {
    const id = req.params.id
    const book = req.body
    book.lastUpdateAt = new Date() // set the lastUpdateAt to the current date
    bookModel.findByIdAndUpdate(id, book, { new: true })
        .then(newBook => {
            res.status(200).send(newBook)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

const deleteBook = (req, res) => {
    const id = req.params.id
    bookModel.deleteOne({_id:id})
        .then(book => {
            res.status(200).send(book)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}


module.exports = {
    getAllBooks,
    getSingleBook,
    addBook,
    updateBook,
    deleteBook
}