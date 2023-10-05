import styles from './fields.module.scss'

import Tooltip from '@/components/ui/Tooltip'

import {
    BiTrash
} from 'react-icons/bi'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

import { useDebounce, useSurvey } from '@/hooks'
import { useCallback, useState, useEffect, useMemo, useRef } from 'react'

const FieldsChoiceItem = ({ ...props }) => {

    const mountRef = useRef(false)

    const { survey, setSurvey } = useSurvey()

    const [textValue, setTextValue] = useState(props.text)

    const text = useDebounce(textValue, 500)

    const selectedQuestion = useMemo(() => {
        return survey.questions.find(question => question._id === props.questionId)
    }, [props.questionId])

    const handleDelete = useCallback(() => {

        selectedQuestion.fields = selectedQuestion.fields.filter(field => field._id != props._id)

        setSurvey({ ...survey })

    }, [survey])

    useEffect(() => {

        if (!mountRef.current) {
            mountRef.current = true
            return
        }

        const selectedField = selectedQuestion.fields.find(field => field._id === props._id)

        selectedField.text = text

        setSurvey({ ...survey })

    }, [text, mountRef])

    return (
        <div className={styles.choiceItem}>
            <div className={cn(
                styles.choiceItemBullet,
                styles['choiceItemBullet' + (props.mode === 'singleChoice' ? 'Circle' : 'Square')]
            )} />
            <input
                data-id={props._id}
                defaultValue={props.text}
                minLength={1}
                maxLength={32}
                onChange={event => setTextValue(event.target.value)}
                className={cn(styles.choiceItemInput, inter)}
                autoComplete="off"
                required
            />

            {(selectedQuestion.fields.length > 1) && <Tooltip text="Usuń opcję" direction="right">
                <button
                    onClick={handleDelete}
                    className={styles.choiceItemDelete}
                >
                    <BiTrash />
                </button>
            </Tooltip>}

        </div>
    )
}

export default FieldsChoiceItem