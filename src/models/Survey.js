import { Schema, model, models } from 'mongoose'

const questionFieldSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
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
    mode: {
        type: String,
        required: true
    },
    isRequired: {
        type: Boolean,
        required: true,
    },
    fields: {
        type: [questionFieldSchema],
        validate: {
            validator: fields => {

                const slugs = new Set(fields.map(field => field.slug))

                return slugs.size === fields.length
            }
        }
    }
})

const answerFieldSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    questionId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    values: {
        type: Array,
        required: false,
    },
    value: {
        type: String,
        required: false,
    }
})

const answerSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    ipAddress: {
        type: String,
        required: true
    },
    fields: [answerFieldSchema],
    createdAt: {
        type: Date,
        default: Date.now
    }
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
    answers: [answerSchema],
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