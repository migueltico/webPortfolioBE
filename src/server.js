const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
require('dotenv').config()
const mongoDB = process.env.MONGO_URI + process.env.MONGO_DB
const port = process.env.PORT || 3001

//config 
const corsOptions = {
	origin: '*',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.Promise = global.Promise
mongoose
	.connect(mongoDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('MongoDB connected')
	})
	.catch((err) => {
		console.log(err)
	})

//routes
const project1Routes = require('./routes/project1Routes')
app.use('/api/project1', project1Routes)



app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
