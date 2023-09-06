import mongoose from 'mongoose'

const mongoConnect = async () => mongoose.connect(process.env.MONGODB_URI)

export default mongoConnect