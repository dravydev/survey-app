import SurveyContext from '@/contexts/SurveyContext'

import { takeSurvey } from '@/actions/surveys'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const SurveyProvider = ({ children }) => {

    const router = useRouter()

    const [survey, setSurvey] = useState(null)
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {

        const { surveyId } = router.query

        const handleTakeSurvey = async () => {

            const { error, data } = await takeSurvey({ surveyId })

            if (error) {

                setSurvey({})

                return
            }

            setSelectedId(data.survey.questions.length ? data.survey.questions.at(0)._id : null)
            setSurvey(data.survey)

        }

        handleTakeSurvey()

    }, [])

    return (
        <SurveyContext.Provider value={{
            survey,
            setSurvey,
            selectedId,
            setSelectedId
        }}>
            {children}
        </SurveyContext.Provider>
    )
}

export default SurveyProvider