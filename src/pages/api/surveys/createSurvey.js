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

    const session = await getServerSession(req, res, authOptions)

    if (!session) {

        res.json({
            error: true,
            details: {
                reason: 'SessionError',
                message: 'Wymagana autoryzacja, spróbuj ponownie'
            }
        })

        return
    }

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
                title: 'Wybierz ulubione marki',
                isRequired: false,
                mode: 'multipleChoice',
                fields: [
                    {
                        slug: 'opel',
                        text: 'Opel'
                    },
                    {
                        slug: 'bmw',
                        text: 'Bmw'
                    },
                    {
                        slug: 'audi',
                        text: 'Audi'
                    },
                    {
                        slug: 'ford',
                        text: 'Ford'
                    },
                    {
                        slug: 'peugeot',
                        text: 'Peugeot'
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
        ownerId: session.user.id
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