import styles from './questions.module.scss'

import QuestionsOptions from './QuestionsOptions'
import QuestionsContainer from './QuestionsContainer'

import { updateSurveyQuestions } from '@/actions/surveys'

import { useSurvey } from '@/hooks'
import { useCallback, useEffect } from 'react'

const Questions = () => {

    const { survey, setSynchronization } = useSurvey()

    const handleForm = useCallback(async event => {

        
        event.preventDefault()
        
        const { error, data } = await updateSurveyQuestions(
            { surveyId: survey._id },
            {
                questions: survey.questions.map(question => {
                    return {
                        _id: question._id,
                        title: question.title,
                        mode: question.mode,
                        isRequired: question.isRequired,
                        fields: question.fields.map(field => ({
                            text: field.text
                        }))
                    }
                })
            }
        )

        console.log(error, data)

        setSynchronization(true)

    }, [survey])

    return (
        <form
            autoComplete="off"
            onSubmit={handleForm}
            className={styles.root}
        >
            <QuestionsOptions />
            <QuestionsContainer />
        </form>
    )
}

export default Questions