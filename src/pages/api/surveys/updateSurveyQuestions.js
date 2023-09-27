import Joi from 'joi'

import Survey from '@/models/Survey'
import mongoConnect from '@/lib/mongoConnect'

import { authOptions } from '../auth/[...nextauth]'

import slugify from '@/utils/slugify'
import { getServerSession } from 'next-auth/next'

const schema = Joi.object({

    surveyId: Joi.string()
        .hex()
        .length(24)
        .required(),

    questions: Joi.array()
        .max(30)
        .items(
            Joi.object({
                _id: Joi.string()
                    .hex()
                    .length(24)
                    .required(),
                title: Joi.string()
                    .min(3)
                    .max(64)
                    .required(),
                mode: Joi.string()
                    .valid('singleChoice', 'multipleChoice', 'shortAnswer', 'longAnswer')
                    .required(),
                isRequired: Joi.boolean(),
                fields: Joi.when('mode', {
                    is: Joi.valid('singleChoice', 'multipleChoice'),
                    then: Joi.array()
                        .min(1)
                        .max(10)
                        .items(
                            Joi.object({
                                text: Joi.string()
                                    .min(1)
                                    .max(32)
                                    .required()
                            })
                        )
                        .required(),
                    otherwise: Joi.array().items()
                })
            })
        )
        .required()

})

const saveSurvey = async (req, res) => {

    const validator = schema.validate({ ...req.query, ...req.body })

    console.log(validator)

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

    questions.forEach(question => {
        question.fields.forEach(field => {
            field.slug = slugify(field.text)
        })
    })

    await Survey.updateOne(
        {
            _id: surveyId,
            ownerId: user.id
        },
        {
            questions: questions
        },
        { runValidators: true }
    )

    res.json({ survey: 'XDDDDDDD' })

}

export default saveSurvey