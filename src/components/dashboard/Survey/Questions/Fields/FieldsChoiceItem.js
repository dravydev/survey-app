import styles from './fields.module.scss'

import Tooltip from '@/components/ui/Tooltip'

import {
    BiTrash
} from 'react-icons/bi'

import cn from '@/utils/cn'
import inter from '@/assets/fonts/inter'

import { useDebounce, useSurvey } from '@/hooks'
import { useCallback, useState, useEffect } from 'react'

const FieldsChoiceItem = ({ ...props }) => {

    const [mount, setMount] = useState(false)

    const { survey, setSurvey, selectedId } = useSurvey()

    const [textValue, setTextValue] = useState(props.text)

    const text = useDebounce(textValue, 500)

    const handleDelete = useCallback(() => {

        const selectedQuestion = survey.questions.find(question => question._id === selectedId)

        selectedQuestion.fields = selectedQuestion.fields.filter(field => field._id != props._id)

        setSurvey({ ...survey })

    }, [selectedId])

    useEffect(() => {
        if (!mount) setMount(true)
    }, [mount])

    useEffect(() => {

        if (!mount) return

        console.log('xd')

        const selectedQuestion = survey.questions.find(question => question._id === selectedId)

        const selectedField = selectedQuestion.fields.find(field => field._id === props._id)

        selectedField.text = text

        setSurvey({ ...survey })

    }, [text])

    return (
        <div className={styles.choiceItem}>
            <div className={cn(
                styles.choiceItemBullet,
                styles['choiceItemBullet' + (props.mode === 'singleChoice' ? 'Circle' : 'Square')]
            )} />
            <input
                name="x"
                defaultValue={props.text}
                onChange={value => setTextValue(value)}
                className={cn(styles.choiceItemInput, inter)}
            />

            <Tooltip text="Usuń opcję" direction="right">
                <button
                    onClick={handleDelete}
                    className={styles.choiceItemDelete}
                >
                    <BiTrash />
                </button>
            </Tooltip>

        </div>
    )
}

export default FieldsChoiceItem