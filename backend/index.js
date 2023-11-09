import express from 'express'
import { PORT, mongoDBURL } from './config.js'
import mongoose from 'mongoose'

const app = express()

app.get('/', (req, res) => {
	console.log(req)
	return res.status(234).send('MERN')
})

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})

mongoose
	.connect(mongoDBURL)
	.then(() => {
		console.log('Connected to MongoDB')
	})
	.catch((err) => {
		console.log('Error connecting to MongoDB: ', err.message)
	})
