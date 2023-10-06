import Survey from '@/models/Survey'
import mongoConnect from '@/lib/mongoConnect'

import { authOptions } from '../auth/[...nextauth]'

import { getServerSession } from 'next-auth/next'

const takeSurveys = async (req, res) => {
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

	await mongoConnect()

	const surveys = await Survey.find(
		{ ownerId: session.user.id },
		{
			title: 1,
			description: 1,
			createdAt: 1
		}
	)

	res.json({ surveys })
}

export default takeSurveys
