import Joi from 'joi'

import Survey from '@/models/Survey'
import mongoConnect from '@/lib/mongoConnect'

import { authOptions } from '../auth/[...nextauth]'

import { getServerSession } from 'next-auth/next'

const schema = Joi.object({

    surveyId: Joi.string()
        .hex()
        .length(24)
        .required()
})

const takeSurvey = async (req, res) => {

    const validator = schema.validate(req.query)

    if (validator.error) {

        res.json({
            error: true,
            details: {
                reason: 'ValidationError',
                message: 'Nieprawidłowe dane, spróbuj ponownie'
            }
        })

        return
    }

    const session = await getServerSession(req, res, authOptions)

    const { surveyId } = validator.value

    await mongoConnect()

    const survey = await Survey.findOne(
        {
            _id: surveyId
        },
        {
            ownerId: 1,
            title: 1,
            description: 1,
            questions: 1,
            answers: {
                fields: 1
            }
        }
    )

    if (!survey) {

        res.json({
            error: true,
            details: {
                reason: 'AccessError',
                message: 'Nie masz dostępu do tej ankiety'
            }
        })

        return
    }

    res.json({
        survey: {
            _id: survey._id,
            title: survey.title,
            description: survey.description,
            questions: survey.questions,
            answers: session?.user?.id == survey.ownerId ? survey.answers : null
        }
    })

}

export default takeSurvey