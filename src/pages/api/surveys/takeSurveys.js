import Survey from '@/models/Survey'
import mongoConnect from '@/lib/mongoConnect'

import { authOptions } from '../auth/[...nextauth]'

import { getServerSession } from 'next-auth/next'

const takeSurveys = async (req, res) => {

    const { user } = await getServerSession(req, res, authOptions)

    await mongoConnect()

    const surveys = await Survey.find({ ownerId: user.id }, {
        title: 1,
        description: 1,
        createdAt: 1
    })

    res.json({ surveys })

}

export default takeSurveys