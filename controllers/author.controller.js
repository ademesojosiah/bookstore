const authorModel = require('../models/author')



const getAllAuthors = (req,res)=>{
    authorModel.find()
    .then(authors => {
        res.status(200).json({nHbits:authors.length, authors})
    })
    .catch(err => {
        console.log(err)
        res.send(err)
    })
}

const getSingleAuthor =  (req, res) => {
    const id = req.params.id
    authorModel.findById(id)
        .then(authors => {
            res.status(200).send(authors)
        }).catch(err => {
            console.log(err)
            res.status(404).send(err)
        })
}

const addAuthor =  (req, res) => {
    const author = req.body
    authorModel.create(author)
        .then(author => {
            res.status(201).send(author)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

const updateAuthor =  (req, res) => {
    const id = req.params.id
    const author = req.body
 // set the lastUpdateAt to the current date
    authorModel.findByIdAndUpdate(id, author, { new: true })
        .then(newAuthor => {
            res.status(200).send(newAuthor)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}

const deleteAuthor = (req, res) => {
    const id = req.params.id
    authorModel.deleteOne({_id:id})
        .then(authors => {
            res.status(200).send(authors)
        }).catch(err => {
            console.log(err)
            res.status(500).send(err)
        })
}


module.exports = {
    getAllAuthors,
    getSingleAuthor,
    addAuthor,
    updateAuthor,
    deleteAuthor
}