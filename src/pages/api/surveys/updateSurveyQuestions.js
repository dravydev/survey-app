import Joi from 'joi'

import Survey from '@/models/Survey'
import mongoConnect from '@/lib/mongoConnect'

import { authOptions } from '../auth/[...nextauth]'

import { getServerSession } from 'next-auth/next'

const schema = Joi.object({

    surveyId: Joi.string()
        .hex()
        .length(24)
        .required(),

    questions: Joi.array()
        .required()

})

const saveSurvey = async (req, res) => {

    const validator = schema.validate({ ...req.query, ...req.body })

    console.log(validator.value)

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

    const { user } = await getServerSession(req, res, authOptions)

    const { surveyId, questions } = validator.value

    await mongoConnect()

    const survey = await Survey.updateOne(
        {
            _id: surveyId,
            ownerId: user.id
        },
        {
            questions: questions
        }
    )

    res.json({ survey: 'XDDDDDDD' })

}

export default saveSurvey