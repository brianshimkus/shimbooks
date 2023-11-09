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
