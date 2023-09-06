import { Schema, model, models } from 'mongoose'

const surveySchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
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