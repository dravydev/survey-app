import styles from './fields.module.scss'

import FieldsChoice from './FieldsChoice'

import { useSurvey } from '@/hooks'
import { useMemo } from 'react'

const Fields = () => {

    const { survey, selectedId } = useSurvey()

    const selectedQuestion = useMemo(() => {

        return survey.questions.find(question => question._id === selectedId)

    }, [survey, selectedId])

    const modes = useMemo(() => {
        return {
            shortAnswer: 'Pole krótkiej odpowiedzi',
            longAnswer: 'Pole długiej odpowiedzi',
            singleChoice: 'Pole jednokrotnego wyboru',
            multipleChoice: 'Pole wielokrotnego wyboru'
        }
    }, [])

    return (
        <div className={styles.root}>
            <FieldsChoice
                mode={selectedQuestion.mode}
                text={modes[selectedQuestion.mode]}
                fields={selectedQuestion.fields}
            />
        </div>
    )
}

export default Fields