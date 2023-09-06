import SurveysContext from '@/contexts/SurveysContext'

import { takeSurveys } from '@/actions/surveys'

import { useEffect, useState } from 'react'

const SurveysProvider = ({ children }) => {

    const [surveys, setSurveys] = useState(null)

    useEffect(() => {

        let attempts = 0

        const handleTakeSurveys = (timeout = 0) => {

            setTimeout(async () => {

                const { error, data } = await takeSurveys()

                if (error && attempts < 3) {

                    handleTakeSurveys(1000)
                    attempts++

                    return
                }

                setSurveys(data.surveys)

            }, timeout)

        }

        handleTakeSurveys()

    }, [])

    return (
        <SurveysContext.Provider value={{ surveys, setSurveys }}>
            {children}
        </SurveysContext.Provider>
    )
}

export default SurveysProvider