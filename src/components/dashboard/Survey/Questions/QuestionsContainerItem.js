import styles from './questions.module.scss'

import Input from '@/components/ui/Input'
import Switch from '@/components/ui/Switch'
import Select from '@/components/ui/Select'
import Tooltip from '@/components/ui/Tooltip'

import Fields from './Fields'

import { PiDotsSix } from 'react-icons/pi'

import cn from '@/utils/cn'

import {
    BiDuplicate,
    BiTrashAlt
} from 'react-icons/bi'

import { SecondaryButton } from '@/components/ui/Button'

import { Draggable } from 'react-beautiful-dnd'
import { useDebounce, useSurvey } from '@/hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'

const QuestionsContainerItem = ({ ...props }) => {

    const [mount, setMount] = useState(false)

    const { survey, setSurvey, selectedId, setSelectedId } = useSurvey()

    const [titleValue, setTitleValue] = useState(props.title)

    const title = useDebounce(titleValue, 500)

    const isSelected = props._id === selectedId ? styles.containerItemSelected : ''

    const modes = useMemo(() => {
        return [
            {
                value: 'shortAnswer',
                text: 'Krótka odpowiedź'
            },
            {
                value: 'longAnswer',
                text: 'Długa odpowiedź'
            },
            {
                value: 'singleChoice',
                text: 'Jednokrotny wybór'
            },
            {
                value: 'multipleChoice',
                text: 'Wielokrotny wybór'
            }
        ]
    }, [])

    const handleSelectQuestion = useCallback(event => {

        if (selectedId === props._id) return

        setSelectedId(props._id)

        event.currentTarget.scrollIntoView({
            block: 'center'
        })

    }, [selectedId])

    const handleSelect = useCallback(value => {
        
        const selectedQuestion = survey.questions.find(question => question._id === selectedId)

        selectedQuestion.mode = value

        if (!value.endsWith('Choice')) selectedQuestion.fields = []

        setSurvey({ ...survey })

    }, [selectedId, survey])

    const handleDuplicate = useCallback(() => {
        console.log('duplicate')
    }, [])

    const handleRequired = useCallback(status => {

        const selectedQuestion = survey.questions.find(question => question._id === selectedId)

        selectedQuestion.isRequired = status

        setSurvey({ ...survey })

    }, [])

    const handleDelete = useCallback(() => {

        survey.questions = survey.questions.filter(question => question._id != selectedId)

        const selectedIndex = survey.questions.findIndex(question => question._id === selectedId)

        setSelectedId(survey.questions.length ? survey.questions.at(selectedIndex)._id : null)

        setSurvey({ ...survey })

    }, [selectedId, survey])

    useEffect(() => {
        if (!mount) setMount(true)
    }, [mount])

    useEffect(() => {

        if (!mount) return

        const selectedQuestion = survey.questions.find(question => question._id === selectedId)

        selectedQuestion.title = title

        setSurvey({ ...survey })

    }, [title])

    return (
        <Draggable
            index={props.index}
            draggableId={props._id}
        >
            {(provided, snapshot) => {

                const isActive = snapshot.isDragging ? styles.containerItemActive : ''

                const transform = provided.draggableProps.style.transform

                const style = {
                    ...provided.draggableProps.style,
                    transform: transform?.replace(/\(([^,]+),/, '(0px,')
                }

                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={style}
                        onClick={handleSelectQuestion}
                        className={cn(styles.containerItem, isActive, isSelected, styles.block)}
                    >
                        <div
                            {...provided.dragHandleProps}
                            className={styles.containerItemMove}
                        >
                            <PiDotsSix />
                        </div>
                        <Input
                            name="title"
                            label="Tytuł pytania"
                            minLength={3}
                            maxLength={64}
                            onChange={value => setTitleValue(value)}
                            defaultValue={props.title}
                            required
                        />
                        <Fields questionId={props._id} />
                        <div className={styles.containerItemSettings}>
                            
                            <Select
                                label="Rodzaj"
                                name="mode"
                                index={modes.findIndex(mode => mode.value == props.mode)}
                                options={modes.map(mode => ({ value: mode.value, text: mode.text }))}
                                onSelect={handleSelect}
                            />

                            <Tooltip text="Duplikuj pytanie">
                                <SecondaryButton onClick={handleDuplicate}>
                                    <BiDuplicate />
                                </SecondaryButton>
                            </Tooltip>

                            <Tooltip text="Usuń pytanie">
                                <SecondaryButton onClick={handleDelete}>
                                    <BiTrashAlt />
                                </SecondaryButton>
                            </Tooltip>

                            <Switch
                                name="isRequired"
                                label="Wymagane"
                                status={props.isRequired}
                                onSwitch={handleRequired}
                            />

                        </div>
                    </div>
                )
            }}
        </Draggable>
    )
}

export default QuestionsContainerItem