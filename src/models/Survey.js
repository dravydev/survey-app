import { Schema, model, models } from 'mongoose'

const surveySchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ownerId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default models.Survey || model('Survey', surveySchema)