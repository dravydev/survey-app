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
                title: 'Imię i nazwisko',
                isRequired: true,
                mode: 'shortAnswer',
                fields: []
            },
            {
                title: 'Jakie preferencje kolorów?',
                isRequired: false,
                mode: 'multipleChoice',
                fields: [
                    {
                        slug: 'bialy',
                        text: 'Biały'
                    },
                    {
                        slug: 'czarny',
                        text: 'Czarny'
                    },
                    {
                        slug: 'szary',
                        text: 'Szary'
                    },
                    {
                        slug: 'czerwony',
                        text: 'Czerwony'
                    },
                    {
                        slug: 'zielony',
                        text: 'Zielony'
                    }
                ]
            },
            {
                title: 'Tak czy nie?',
                isRequired: true,
                mode: 'singleChoice',
                fields: [
                    {
                        slug: 'tak',
                        text: 'Tak'
                    },
                    {
                        slug: 'nie',
                        text: 'Nie'
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