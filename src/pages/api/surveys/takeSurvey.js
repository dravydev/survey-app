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

    // const { user } = await getServerSession(req, res, authOptions)

    const { surveyId } = validator.value

    await mongoConnect()

    const survey = await Survey.findOne(
        {
            _id: surveyId
        },
        {
            title: 1,
            description: 1,
            questions: 1
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

    res.json({ survey })

}

export default takeSurvey