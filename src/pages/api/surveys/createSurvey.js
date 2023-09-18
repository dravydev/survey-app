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

    const { title, description } = validator.value

    await mongoConnect()

    const survey = await Survey.create({
        title: title,
        description: description,
        questions: [
            {
                title: 'Przykładowe pytanie - wybierz opcje',
                description: null,
                isDescription: false,
                isRequired: true,
                mode: 'singleChoice',
                fields: [
                    {
                        type: 'select',
                        slug: 'opcja-1',
                        text: 'Opcja 1'
                    },
                    {
                        type: 'select',
                        slug: 'opcja-2',
                        text: 'Opcja 2'
                    },
                    {
                        type: 'select',
                        slug: 'opcja-3',
                        text: 'Opcja 3'
                    }
                ]
            }
        ],
        ownerId: user.id
    })

    res.json({
        survey: {
            _id: survey._id,
            title: survey.title,
            description: survey.description,
            createdAt: survey.createdAt
        }
    })

}

export default createSurvey