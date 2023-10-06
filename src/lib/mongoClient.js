import { MongoClient } from 'mongodb'

const mongoClient = new MongoClient(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
})

export default mongoClient
