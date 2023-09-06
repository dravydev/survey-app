import Joi from 'joi'

import Survey from '@/models/Survey'
import mongoConnect from '@/lib/mongoConnect'

import { authOptions } from '../auth/[...nextauth]'

import { getServerSession } from 'next-auth/next'

const schema = Joi.object({

    title: Joi.string()
        .min(3)
        .max(32)
        .required(),

    description: Joi.string()
        .min(3)
        .max(256)
        .required()
})

const createSurvey = async (req, res) => {

    const validator = schema.validate(req.body)

    console.log(validator.value.description.length)

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

    const { title, description } = validator.value

    await mongoConnect()

    const survey = await Survey.create({
        ownerId: session.user.id,
        title: title,
        description: description
    })

    res.json({
        survey: {
            _id: survey._id
        }
    })

}

export default createSurvey