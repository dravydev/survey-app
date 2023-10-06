import mongoose from 'mongoose'

const mongoConnect = async () => {
	if (!mongoose.connection.readyState) mongoose.connect(process.env.MONGODB_URI)
}

export default mongoConnect
