import Survey from '@/models/Survey'
import mongoConnect from '@/lib/mongoConnect'

const takeSurveysPaths = async (req, res) => {
	await mongoConnect()

	const surveys = await Survey.find({}, { _id: 1 })

	res.json({ surveys })
}

export default takeSurveysPaths
