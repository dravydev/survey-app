import Joi from 'joi'

import Survey from '@/models/Survey'
import mongoConnect from '@/lib/mongoConnect'

import { authOptions } from '../auth/[...nextauth]'

import { getServerSession } from 'next-auth/next'

const schema = Joi.object({
	surveyId: Joi.string().hex().length(24).required()
})

const refreshSurveyAnswers = async (req, res) => {
	const validator = schema.validate(req.query)

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

	const { surveyId } = validator.value

	await mongoConnect()

	const survey = await Survey.findOne(
		{
			_id: surveyId,
			ownerId: session.user.id
		},
		{
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

	res.json({ answers: survey.answers })
}

export default refreshSurveyAnswers
