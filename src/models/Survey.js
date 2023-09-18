import { Schema, model, models } from 'mongoose'

const fieldSchema = new Schema({
    type: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    }
})

const questionSchema = new Schema({
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
        required: false
    },
    isDescription: {
        type: Boolean,
        required: true,
    },
    isRequired: {
        type: Boolean,
        required: true,
    },
    mode: {
        type: String,
        required: true
    },
    fields: [fieldSchema]
})

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
    questions: [questionSchema],
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