import styles from './questions.module.scss'

import Input from '@/components/ui/Input'

import { PiDotsSix } from 'react-icons/pi'

import cn from '@/utils/cn'

import { Draggable } from 'react-beautiful-dnd'

const QuestionsContainerItem = ({ ...props }) => {
    return (
        <Draggable draggableId={props.id} index={props.index}>

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
                        className={cn(styles.containerItem, isActive, styles.block)}
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
                    </div>
                )
            }}

        </Draggable>
    )
}

export default QuestionsContainerItem