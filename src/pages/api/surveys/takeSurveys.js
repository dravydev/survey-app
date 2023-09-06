import Survey from '@/models/Survey'
import mongoConnect from '@/lib/mongoConnect'

import { authOptions } from '../auth/[...nextauth]'

import { getServerSession } from 'next-auth/next'

const createSurvey = async (req, res) => {

    const { user } = await getServerSession(req, res, authOptions)

    await mongoConnect()

    const surveys = await Survey.find({ ownerId: user.id })

    res.json({ surveys })

}

export default createSurvey