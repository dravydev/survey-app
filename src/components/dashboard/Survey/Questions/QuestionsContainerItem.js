import styles from './questions.module.scss'

import Input from '@/components/ui/Input'
import Switch from '@/components/ui/Switch'
import Select from '@/components/ui/Select'

import Fields from './Fields'

import { PiDotsSix } from 'react-icons/pi'

import cn from '@/utils/cn'

import { useSurvey } from '@/hooks'
import { Draggable } from 'react-beautiful-dnd'
import { useMemo, useState } from 'react'

const QuestionsContainerItem = ({ ...props }) => {

    const [mode, setMode] = useState(props.mode)
    const [isDescription, setIsDescription] = useState(props.isDescription)

    const { selectedId, setSelectedId } = useSurvey()

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

    const handleClick = event => {

        if (selectedId === props._id) return

        setSelectedId(props._id)

        event.currentTarget.scrollIntoView({
            block: 'center'
        })

    }

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
                    <form
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={style}
                        onClick={handleClick}
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
                            defaultValue={props.title}
                        />
                        {isDescription && <div className={styles.containerItemQuestion}>
                            <Input
                                name="description"
                                label="Opis pytania"
                                defaultValue={props.description}
                            />
                        </div>}
                        <Fields mode={mode} fields={props.fields} />
                        <div className={styles.containerItemSettings}>
                            <Select
                                label="Rodzaj"
                                name="mode"
                                index={modes.findIndex(mode => mode.value == props.mode)}
                                options={modes.map(mode => ({ value: mode.value, text: mode.text }))}
                                status={mode}
                                setStatus={setMode}
                            />
                            <Switch
                                name="isDescription"
                                label="Opis"
                                status={isDescription}
                                setStatus={setIsDescription}
                            />
                            <Switch
                                name="isRequired"
                                label="Wymagane"
                                status={props.isRequired}
                            />
                        </div>
                    </form>
                )
            }}
        </Draggable>
    )
}

export default QuestionsContainerItem