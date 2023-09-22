import styles from './fields.module.scss'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

import generateHexId from '@/utils/generateHexId'

import { useSurvey } from '@/hooks'
import { useCallback } from 'react'

const FieldsChoiceInsert = () => {

    const { survey, setSurvey, selectedId } = useSurvey()

    const handleInsert = useCallback(() => {

        const selectedQuestion = survey.questions.find(question => question._id === selectedId)

        selectedQuestion.fields.push({
            _id: generateHexId(24),
            text: 'Nowa opcja',
            type: 'select'
        })

        setSurvey({ ...survey })

    }, [selectedId, survey])

    return (
        <div className={cn(styles.choiceInsert, inter)}>

            <button
                type="button"
                onClick={handleInsert}
                className={styles.choiceInsertButton}
            >
                Dodaj opcję
            </button>

            <span className={styles.choiceInsertText}>lub</span>

            <button
                type="button"
                onClick={handleInsert}
                className={styles.choiceInsertButton}
            >
                Dodaj opcję &ldquo;Inne&rdquo;
            </button>

        </div>
    )
}

export default FieldsChoiceInsert