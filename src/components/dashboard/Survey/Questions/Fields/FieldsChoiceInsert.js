import styles from './fields.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

import generateHexId from '@/utils/generateHexId'

import { useSurvey } from '@/hooks'
import { useCallback, useMemo } from 'react'

const FieldsChoiceInsert = ({ ...props }) => {

    const { survey, setSurvey } = useSurvey()

    const selectedQuestion = useMemo(() => {
        return survey.questions.find(question => question._id === props.questionId)
    }, [props.questionId])

    const handleInsert = useCallback(async () => {

        const fieldId = generateHexId(24)

        selectedQuestion.fields.push({
            _id: fieldId,
            text: 'Nowa opcja'
        })

        await setSurvey({ ...survey })

        const input = document.querySelector(`[data-id="${fieldId}"]`)

        if (input) input.select()

    }, [survey])

    if (selectedQuestion.fields.length < 10) return (
        <div className={cn(styles.choiceInsert, inter)}>

            <button
                type="button"
                onClick={handleInsert}
                className={styles.choiceInsertButton}
            >
                Dodaj opcję
            </button>

        </div>
    )
}

export default FieldsChoiceInsert