import Survey from '@/models/Survey'
import mongoConnect from '@/lib/mongoConnect'

const createSurvey = (req, res) => {

    res.json({
        task: true
    })

}

export default createSurvey