import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'
import { Book } from './models/bookModel.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
	console.log(req)
	return res.status(234).send('MERN')
})

app.post('/books', async (req, res) => {
	try {
		if (!req.body.title || !req.body.author || !req.body.publishYear) {
			return res
				.status(400)
				.send({ msg: 'Send all required fields: title, author, publishYear' })
		}
		const newBook = {
			title: req.body.title,
			author: req.body.author,
			publishYear: req.body.publishYear,
		}

		const book = await Book.create(newBook)

		return res.status(201).send(book)
	} catch (err) {
		console.log(err.msg)
		res.status(500).send({ msg: err.msg })
	}
})

app.get('/books', async (req, res) => {
	try {
		const books = await Book.find({})
		return res.status(200).json({ count: books.length, data: books })
	} catch (err) {
		console.log(err)
		res.status(500).send({ msg: err.msg })
	}
})

app.get('/books/:id', async (req, res) => {
	try {
		const { id } = req.params

		const book = await Book.findById(id)

		return res.status(200).json(book)
	} catch (err) {
		console.log(err)
		res.status(500).send({ msg: err.msg })
	}
})

app.put('/books/:id', async (req, res) => {
	try {
		if (!req.body.title || !req.body.author || !req.body.publishYear) {
			return res
				.status(400)
				.send({ msg: 'Send all required fields: title, author, publishYear' })
		}

		const { id } = req.params

		const res = await Book.findByIdAndUpdate(id, req.body)

		if (!result) {
			return res.status(404).json({ msg: 'Book not found' })
		}

		return res.status(200).send({ msg: 'Book updated' })
	} catch (err) {
		console.log(err.msg)
		res.status(500).send({ msg: err.msg })
	}
})

mongoose
	.connect(mongoDBURL)
	.then(() => {
		console.log('Connected to MongoDB')
		app.listen(PORT, () => {
			console.log(`App is listening to port: ${PORT}`)
		})
	})
	.catch((err) => {
		console.log(err)
	})
